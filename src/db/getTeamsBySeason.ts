import db from "./db";
import { eq } from "drizzle-orm";
import { teamTable } from "./schema";

/**
 * Get a list of every team in a season.
 * @param seasonId - The ID of the season.
 * @returns A list of every team in the given season.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getTeamsBySeason(seasonId: number) {
	return await db
		.select()
		.from(teamTable)
		.where(eq(teamTable.seasonId, seasonId));
}
