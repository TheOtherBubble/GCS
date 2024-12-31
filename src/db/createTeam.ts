import type { InsertTeam } from "types/db/Team";
import db from "./db";
import { teamTable } from "./schema";

/**
 * Create a team.
 * @param team - The team.
 * @returns When finished.
 */
export default async function createTeam(team: InsertTeam) {
	return await db.insert(teamTable).values(team);
}
