import { eq, or } from "drizzle-orm";
import type { UpdateSeason } from "types/db/Season";
import db from "./db";
import { seasonTable } from "./schema";

/**
 * Update a set of seasons.
 * @param season - The new data to update in the seasons.
 * @param id - The IDs of the seasons.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateSeason(
	season: UpdateSeason,
	...ids: number[]
) {
	await db
		.update(seasonTable)
		.set(season)
		.where(or(...ids.map((id) => eq(seasonTable.id, id))));
}
