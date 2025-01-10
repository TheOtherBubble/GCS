import { eq, or } from "drizzle-orm";
import {
	gameResultTable,
	gameTable,
	matchTable,
	teamGameResultTable
} from "./schema";
import db from "./db";

/**
 * Get all of the matches played by a set of teams. Includes the games, game results, and team game results (when applicable).
 * @param ids - The IDs of the teams.
 * @returns The teams' matches. Includes the matches, games, game results, and team game results.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getMatchesByTeams(...ids: number[]) {
	return await db
		.select()
		.from(matchTable)
		.leftJoin(gameTable, eq(matchTable.id, gameTable.matchId))
		.leftJoin(gameResultTable, eq(gameTable.id, gameResultTable.gameId))
		.leftJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.where(
			or(
				...ids.map((id) =>
					or(eq(matchTable.blueTeamId, id), eq(matchTable.redTeamId, id))
				)
			)
		);
}
