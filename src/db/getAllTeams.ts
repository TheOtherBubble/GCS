import db from "./db";
import { teamTable } from "./schema";

/**
 * Get a list of every team.
 * @returns A list of every team.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAllTeams() {
	return await db.select().from(teamTable);
}
