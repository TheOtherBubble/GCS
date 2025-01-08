import { eq, or } from "drizzle-orm";
import {
	gameResultTable,
	gameTable,
	matchTable,
	teamGameResultTable
} from "./schema";
import type { Team } from "types/db/Team";
import db from "./db";

/**
 * Get all of the matches played by a team.
 * @param team - The team.
 * @returns The team's matches. Includes the matches, games, game results, and team game results.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getMatchesByTeam(team: Team) {
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
			or(eq(matchTable.blueTeamId, team.id), eq(matchTable.redTeamId, team.id))
		);
}
