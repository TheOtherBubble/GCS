import { eq, or } from "drizzle-orm";
import {
	gameResultTable,
	gameTable,
	playerGameResultTable,
	teamGameResultTable
} from "./schema";
import db from "./db";

/**
 * Get all of a set of matches' games. Includes the game results, team game results, and player game results (when applicable).
 * @param ids - The IDs of the matches.
 * @returns The matches' game results. Includes the games, game results, team game results, and player game results.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getGamesByMatches(...ids: number[]) {
	return await db
		.select()
		.from(gameTable)
		.leftJoin(gameResultTable, eq(gameTable.id, gameResultTable.gameId))
		.leftJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.leftJoin(
			playerGameResultTable,
			eq(teamGameResultTable.id, playerGameResultTable.teamGameResultId)
		)
		.where(or(...ids.map((id) => eq(gameTable.matchId, id))));
}
