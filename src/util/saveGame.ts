import {
	gameResultTable,
	gameTable,
	type platformEnum,
	playerGameResultTable,
	teamGameResultBanTable,
	teamGameResultTable
} from "db/schema";
import convertResult from "./convertResult";
import db from "db/db";
import { eq } from "drizzle-orm";
import getClusterForPlatform from "./getClusterForPlatform";
import getMatchDto from "riot/getMatchDto";
import makeMatchId from "./makeMatchId";

/**
 * Given a game ID and a platform routing value, get game results from the Riot API and save it to the GCS database.
 * @param id - The game ID.
 * @param puuids - A map of the IDs of the teams in the match to the lists of the PUUIDS of the accounts of the players on those teams.
 * @param game - The game to link to the results.
 * @param platform - The game's platform routing value.
 * @returns When finished.
 * @public
 */
export default async function saveGame(
	id: number | `${number}`,
	puuids?: Map<number, string[]>,
	game?: Pick<typeof gameTable.$inferSelect, "tournamentCode" | "id">,
	platform: (typeof platformEnum.enumValues)[number] = "NA1"
): Promise<void> {
	// Determine the match ID and cluster.
	const matchId = makeMatchId(id, platform);
	const cluster = getClusterForPlatform(platform);

	// Get the game details from the Riot API.
	const dto = await getMatchDto(matchId, cluster);

	// Convert the game details to the proper format for the GCS database.
	const [result, teams, bans, players] = convertResult(dto, puuids);

	// Update the game's tournament code to match the imported tournament code if necessary.
	if (
		game &&
		result.tournamentCode &&
		game.tournamentCode !== result.tournamentCode
	) {
		await db
			.update(gameTable)
			.set({ tournamentCode: result.tournamentCode })
			.where(eq(gameTable.id, game.id));
	}

	// Save the game results to the GCS database.
	await db.insert(gameResultTable).values(result);
	await db.insert(teamGameResultTable).values(teams);
	await db.insert(teamGameResultBanTable).values(bans);
	await db.insert(playerGameResultTable).values(players);
}
