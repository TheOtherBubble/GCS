import {
	gameResultsTable,
	gamesTable,
	playerGameResultsTable,
	type playersTable,
	teamGameResultsTable
} from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a player's game results.
 * @param player - The player.
 * @returns The player's completed games. Includes the game, game result, team game result, and player game result.
 * @public
 */
export default async function getPlayerGameResultsByPlayer(
	player: typeof playersTable.$inferSelect
) {
	return await db
		.select()
		.from(gamesTable)
		.innerJoin(gameResultsTable, eq(gamesTable.id, gameResultsTable.gameId))
		.innerJoin(
			teamGameResultsTable,
			eq(gameResultsTable.id, teamGameResultsTable.gameResultId)
		)
		.innerJoin(
			playerGameResultsTable,
			eq(teamGameResultsTable.id, playerGameResultsTable.teamGameResultId)
		)
		.where(eq(playerGameResultsTable.playerId, player.id));
}
