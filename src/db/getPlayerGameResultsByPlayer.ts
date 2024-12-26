import {
	gameResultTable,
	gameTable,
	playerGameResultTable,
	type playerTable,
	teamGameResultTable
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
	player: typeof playerTable.$inferSelect
) {
	return await db
		.select()
		.from(gameTable)
		.innerJoin(gameResultTable, eq(gameTable.id, gameResultTable.gameId))
		.innerJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.innerJoin(
			playerGameResultTable,
			eq(teamGameResultTable.id, playerGameResultTable.teamGameResultId)
		)
		.where(eq(playerGameResultTable.playerId, player.id));
}
