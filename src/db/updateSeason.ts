import type { InferUpdate } from "types/InferUpdate";
import db from "./db";
import { eq } from "drizzle-orm";
import { seasonTable } from "./schema";

/**
 * Update a season.
 * @param id - The ID of the season.
 * @param season - The new data to update in the season.
 * @returns When finished.
 */
export default async function updateSeason(
	id: number,
	season: InferUpdate<typeof seasonTable.$inferInsert>
) {
	await db.update(seasonTable).set(season).where(eq(seasonTable.id, id));
}
