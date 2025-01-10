import { eq, or } from "drizzle-orm";
import db from "./db";
import { teamTable } from "./schema";

/**
 * Get teams.
 * @param ids - The IDs of the teams.
 * @returns The teams.
 * @public
 */
export default async function getTeams(...ids: number[]) {
	return await db
		.select()
		.from(teamTable)
		.where(or(...ids.map((id) => eq(teamTable.id, id))));
}
