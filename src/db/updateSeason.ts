import type { UpdateSeason } from "types/db/Season";
import db from "./db";
import { eq } from "drizzle-orm";
import { seasonTable } from "./schema";

/**
 * Update a season.
 * @param id - The ID of the season.
 * @param season - The new data to update in the season.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateSeason(id: number, season: UpdateSeason) {
	await db.update(seasonTable).set(season).where(eq(seasonTable.id, id));
}
