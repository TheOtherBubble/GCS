import { and, eq, or } from "drizzle-orm";
import {
	gameResultTable,
	gameTable,
	matchTable,
	seasonTable,
	teamGameResultTable,
	teamTable
} from "./schema";
import db from "./db";

/**
 * Get all of the matches in a season.
 * @param season - The season.
 * @returns The season's matches. Includes the matches, games, game results, team game results, and teams.
 * @public
 */
export default async function getTeamGameResultsBySeason(
	season: typeof seasonTable.$inferSelect
) {
	return await db
		.select()
		.from(teamTable)
		.leftJoin(
			matchTable,
			or(
				eq(teamTable.id, matchTable.blueTeamId),
				eq(teamTable.id, matchTable.redTeamId)
			)
		)
		.leftJoin(gameTable, eq(matchTable.id, gameTable.matchId))
		.leftJoin(gameResultTable, eq(gameTable.id, gameResultTable.gameId))
		.leftJoin(
			teamGameResultTable,
			and(
				eq(gameResultTable.id, teamGameResultTable.gameResultId),
				eq(teamTable.id, teamGameResultTable.teamId)
			)
		)
		.where(eq(teamTable.seasonId, season.id));
}
