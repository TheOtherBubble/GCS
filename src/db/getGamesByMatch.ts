import {
	gameResultTable,
	gameTable,
	playerGameResultTable,
	teamGameResultTable
} from "./schema";
import type { Match } from "types/db/Match";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a match's games.
 * @param match - The match.
 * @returns The match's games. Includes the games, game results, team game results, and player game results.
 * @public
 */
export default async function getGamesByMatch(match: Match) {
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
		.where(eq(gameTable.matchId, match.id));
}
