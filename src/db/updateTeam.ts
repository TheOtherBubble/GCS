import type { UpdateTeam } from "types/db/Team";
import db from "./db";
import { eq } from "drizzle-orm";
import { teamTable } from "./schema";

/**
 * Update a team.
 * @param id - The ID of the team.
 * @param team - The new data to update in the team.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateTeam(id: number, team: UpdateTeam) {
	await db.update(teamTable).set(team).where(eq(teamTable.id, id));
}
