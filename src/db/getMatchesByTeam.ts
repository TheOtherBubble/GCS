import { eq, or } from "drizzle-orm";
import { matchTable, teamTable } from "./schema";
import type { Team } from "types/db/Team";
import db from "./db";

/**
 * Get all of the matches played by a team.
 * @param team - The team.
 * @returns The team's matches. Includes the matches and teams.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getMatchesByTeam(team: Team) {
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
		.where(
			or(eq(matchTable.blueTeamId, team.id), eq(matchTable.redTeamId, team.id))
		);
}
