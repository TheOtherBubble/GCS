import db from "./db";
import { teamsTable } from "./schema";

/**
 * Get a list of every team.
 * @returns A list of every team.
 * @public
 */
export default async function getAllTeams(): Promise<
	(typeof teamsTable.$inferSelect)[]
> {
	return await db.select().from(teamsTable);
}
