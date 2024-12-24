import type { InferUpdate } from "./InferUpdate";
import db from "./db";
import { eq } from "drizzle-orm";
import { seasonsTable } from "./schema";

/**
 * Update a season.
 * @param id - The ID of the season.
 * @param season - The new data to update in the season.
 * @returns When finished.
 */
export default async function updateSeason(
	id: number,
	season: InferUpdate<typeof seasonsTable.$inferInsert>
) {
	await db.update(seasonsTable).set(season).where(eq(seasonsTable.id, id));
}
