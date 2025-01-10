import { eq, or } from "drizzle-orm";
import type { UpdateTeam } from "types/db/Team";
import db from "./db";
import { teamTable } from "./schema";

/**
 * Update a set of teams.
 * @param team - The new data to update in the teams.
 * @param ids - The IDs of the teams.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateTeam(team: UpdateTeam, ...ids: number[]) {
	await db
		.update(teamTable)
		.set(team)
		.where(or(...ids.map((id) => eq(teamTable.id, id))));
}
