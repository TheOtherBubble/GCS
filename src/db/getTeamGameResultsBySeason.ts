import { eq, or } from "drizzle-orm";
import {
	gameResultTable,
	gameTable,
	matchTable,
	seasonTable,
	teamGameResultTable,
	teamTable
} from "./schema";
import db from "./db";

/**
 * Get all of the matches in a season.
 * @param season - The season.
 * @returns The season's matches. Includes the matches, games, game results, team game results, and teams.
 * @public
 */
export default async function getTeamGameResultsBySeason(
	season: typeof seasonTable.$inferSelect
) {
	return await db
		.select()
		.from(matchTable)
		.leftJoin(
			teamTable,
			or(
				eq(matchTable.blueTeamId, teamTable.id),
				eq(matchTable.redTeamId, teamTable.id)
			)
		)
		.leftJoin(gameTable, eq(matchTable.id, gameTable.matchId))
		.leftJoin(gameResultTable, eq(gameTable.id, gameResultTable.gameId))
		.leftJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.where(eq(matchTable.seasonId, season.id));
}
