import { eq, or } from "drizzle-orm";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Get all of a set of teams' team players.
 * @param ids - The IDs of the teams.
 * @returns The teams' team players.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getTeamPlayersByTeams(...ids: number[]) {
	return await db
		.select()
		.from(teamPlayerTable)
		.where(or(...ids.map((id) => eq(teamPlayerTable.teamId, id))));
}
