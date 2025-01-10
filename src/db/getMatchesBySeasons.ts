import { eq, or } from "drizzle-orm";
import {
	gameResultTable,
	gameTable,
	matchTable,
	teamGameResultTable
} from "./schema";
import db from "./db";

/**
 * Get all of the matches in a set of seasons. Includes the games, game results, and team game results (when applicable).
 * @param ids - The IDs of the seasons.
 * @returns The seasons' matches. Includes the matches, games, game results, and team game results.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getMatchesBySeasons(...ids: number[]) {
	return await db
		.select()
		.from(matchTable)
		.leftJoin(gameTable, eq(matchTable.id, gameTable.matchId))
		.leftJoin(gameResultTable, eq(gameTable.id, gameResultTable.gameId))
		.leftJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.where(or(...ids.map((id) => eq(matchTable.seasonId, id))));
}
