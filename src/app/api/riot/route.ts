import { NextRequest, NextResponse } from "next/server";
import {
	accountTable,
	gameResultTable,
	gameTable,
	matchTable,
	playerGameResultTable,
	playerTable,
	teamGameResultBanTable,
	teamGameResultTable,
	teamPlayerTable,
	teamTable
} from "db/schema";
import { eq, or } from "drizzle-orm";
import type TournamentGames from "types/riot/TournamentGames";
import convertResult from "util/convertResult";
import db from "db/db";
import getClusterForRegion from "util/getClusterForRegion";
import getFormatGameCount from "util/getFormatGameCount";
import getMatchDto from "riot/getMatchDto";
import leftHierarchy from "util/leftHierarchy";
import makeMatchId from "util/makeMatchId";
import makeTournamentCodes from "riot/makeTournamentCodes";

/**
 * Receive a tournament code game callback.
 * @public
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const games = (await request.json()) as TournamentGames[];
	if (games.length > 1) {
		return new NextResponse(
			"More than one game was returned. Did you use the same tournament code twice?",
			{ status: 400 }
		);
	}

	const [game] = games;
	if (!game) {
		return new NextResponse("No games were returned.", { status: 400 });
	}

	try {
		// Get relevant GCS game, match, player, and account data.
		const rows = await db
			.select()
			.from(gameTable)
			.leftJoin(matchTable, eq(gameTable.matchId, matchTable.id))
			.leftJoin(
				teamTable,
				or(
					eq(matchTable.blueTeamId, teamTable.id),
					eq(matchTable.redTeamId, teamTable.id)
				)
			)
			.leftJoin(teamPlayerTable, eq(teamTable.id, teamPlayerTable.teamId))
			.leftJoin(playerTable, eq(teamPlayerTable.playerId, playerTable.id))
			.leftJoin(accountTable, eq(playerTable.id, accountTable.playerId))
			.where(eq(gameTable.tournamentCode, game.shortCode));

		// Convert and store game results.
		const [gameResult, teams, bans, players] = convertResult(
			await getMatchDto(
				makeMatchId(game.gameId),
				getClusterForRegion(game.region)
			),
			new Map(
				leftHierarchy(rows, "team", "account").map(
					({ value: { id }, children: accounts }) => [
						id,
						accounts.map(({ puuid }) => puuid)
					]
				)
			)
		);
		await db.insert(gameResultTable).values(gameResult);
		await db.insert(teamGameResultTable).values(teams);
		await db.insert(teamGameResultBanTable).values(bans);
		await db.insert(playerGameResultTable).values(players);

		// Get the match that the game belongs to.
		const [match] = leftHierarchy(rows, "match");
		if (!match) {
			return new NextResponse(void 0, { status: 200 });
		}

		// Count the number of wins that each team has.
		const teamGameResults = leftHierarchy(
			await db
				.select()
				.from(matchTable)
				.leftJoin(gameTable, eq(matchTable.id, gameTable.matchId))
				.leftJoin(
					gameResultTable,
					eq(gameTable.tournamentCode, gameResultTable.tournamentCode)
				)
				.leftJoin(
					teamGameResultTable,
					eq(gameResultTable.id, teamGameResultTable.gameResultId)
				)
				.where(eq(matchTable.id, match.id)),
			"teamGameResult"
		);
		const wins = new Map<number, number>();
		for (const teamGameResult of teamGameResults) {
			wins.set(teamGameResult.team, (wins.get(teamGameResult.team) ?? 0) + 1);
		}

		// Check if another game needs to be made.
		const [, , toWin] = getFormatGameCount(match.format);
		if (wins.values().some((value) => value >= toWin)) {
			return new NextResponse(void 0, { status: 200 });
		}

		// Make a new tournament code for the next game.
		const [tournamentCode] = await makeTournamentCodes();
		if (!tournamentCode) {
			return new NextResponse(void 0, { status: 200 });
		}

		// Create the next game.
		await db.insert(gameTable).values({ matchId: match.id, tournamentCode });
		return new NextResponse(void 0, { status: 200 });
	} catch (e) {
		return new NextResponse(JSON.stringify(e), { status: 500 });
	}
};
