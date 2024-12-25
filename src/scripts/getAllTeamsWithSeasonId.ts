import db from "./db";
import { eq } from "drizzle-orm";
import { teamsTable } from "./schema";

/**
 * Get a list of every team in a season.
 * @param seasonId - The ID of the season.
 * @returns A list of every team in the given season.
 * @public
 */
export default async function getAllTeamsWithSeasonId(seasonId: number) {
	return await db
		.select()
		.from(teamsTable)
		.where(eq(teamsTable.seasonId, seasonId));
}
