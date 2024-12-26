import { eq, or } from "drizzle-orm";
import {
	gameResultsTable,
	gamesTable,
	matchesTable,
	seasonsTable,
	teamGameResultsTable,
	teamsTable
} from "./schema";
import db from "./db";

/**
 * Get all of the matches in a season.
 * @param season - The season.
 * @returns The season's matches. Includes the matches, games, game results, team game results, and teams.
 * @public
 */
export default async function getTeamGameResultsBySeason(
	season: typeof seasonsTable.$inferSelect
) {
	return await db
		.select()
		.from(matchesTable)
		.leftJoin(
			teamsTable,
			or(
				eq(matchesTable.blueTeamId, teamsTable.id),
				eq(matchesTable.redTeamId, teamsTable.id)
			)
		)
		.leftJoin(gamesTable, eq(matchesTable.id, gamesTable.matchId))
		.leftJoin(gameResultsTable, eq(gamesTable.id, gameResultsTable.gameId))
		.leftJoin(
			teamGameResultsTable,
			eq(gameResultsTable.id, teamGameResultsTable.gameResultId)
		)
		.where(eq(matchesTable.seasonId, season.id));
}
