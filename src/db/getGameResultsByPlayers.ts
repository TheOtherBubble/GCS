import { eq, or } from "drizzle-orm";
import {
	gameResultTable,
	gameTable,
	playerGameResultTable,
	teamGameResultTable
} from "./schema";
import db from "./db";

/**
 * Get all of a set of player's game results, including the games, game results, and team game results.
 * @param ids - The IDs of the players.
 * @returns The players' game results. Includes the game, game result, team game result, and player game result.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getGameResultsByPlayers(...ids: string[]) {
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
		.where(or(...ids.map((id) => eq(playerGameResultTable.playerId, id))));
}
