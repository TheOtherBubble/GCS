import type { Season } from "types/db/Season";
import db from "./db";
import { eq } from "drizzle-orm";
import { teamTable } from "./schema";

/**
 * Get a list of every team in a season.
 * @param season - The season.
 * @returns A list of every team in the given season.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getTeamsBySeason(season: Season) {
	return await db
		.select()
		.from(teamTable)
		.where(eq(teamTable.seasonId, season.id));
}
