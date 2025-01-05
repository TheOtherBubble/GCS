import {
	gameResultTable,
	gameTable,
	playerGameResultTable,
	teamGameResultTable
} from "./schema";
import type { Player } from "types/db/Player";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a player's game results.
 * @param player - The player.
 * @returns The player's completed games. Includes the game, game result, team game result, and player game result.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getPlayerGameResultsByPlayer(player: Player) {
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
