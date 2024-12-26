import db from "./db";
import { teamTable } from "./schema";

/**
 * Create a team.
 * @param team - The team.
 * @returns When finished.
 */
export default async function createTeam(team: typeof teamTable.$inferInsert) {
	return await db.insert(teamTable).values(team);
}
