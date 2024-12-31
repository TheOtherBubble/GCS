import {
	gameResultTable,
	gameTable,
	matchTable,
	teamGameResultTable
} from "./schema";
import type { Season } from "types/db/Season";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of the matches in a season.
 * @param season - The season.
 * @returns The season's matches. Includes the matches, games, game results, and team game results.
 * @public
 */
export default async function getMatchesBySeason(season: Season) {
	return await db
		.select()
		.from(matchTable)
		.leftJoin(gameTable, eq(matchTable.id, gameTable.matchId))
		.leftJoin(gameResultTable, eq(gameTable.id, gameResultTable.gameId))
		.leftJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.where(eq(matchTable.seasonId, season.id));
}
