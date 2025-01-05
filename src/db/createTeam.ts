import type { InsertTeam } from "types/db/Team";
import db from "./db";
import { teamTable } from "./schema";

/**
 * Create a team.
 * @param team - The team.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createTeam(team: InsertTeam) {
	await db.insert(teamTable).values(team);
}
