import db from "./db";
import { teamsTable } from "./schema";

/**
 * Create a team.
 * @param team - The team.
 * @returns When finished.
 */
export default async function createTeam(team: typeof teamsTable.$inferInsert) {
	return await db.insert(teamsTable).values(team);
}
