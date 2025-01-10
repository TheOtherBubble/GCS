import type { InsertTeam } from "types/db/Team";
import db from "./db";
import { teamTable } from "./schema";

/**
 * Create teams.
 * @param teams - The teams.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createTeams(...teams: InsertTeam[]) {
	return await db.insert(teamTable).values(teams);
}
