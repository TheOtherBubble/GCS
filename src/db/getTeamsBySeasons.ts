import { eq, or } from "drizzle-orm";
import db from "./db";
import { teamTable } from "./schema";

/**
 * Get a list of every team in a set of seasons.
 * @param ids - The IDs of the seasons.
 * @returns A list of every team in the given set of seasons.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getTeamsBySeasons(...ids: number[]) {
	return await db
		.select()
		.from(teamTable)
		.where(or(...ids.map((id) => eq(teamTable.seasonId, id))));
}
