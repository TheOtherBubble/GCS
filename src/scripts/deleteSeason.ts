import db from "./db";
import { eq } from "drizzle-orm";
import { seasonsTable } from "./schema";

/**
 * Delete a season.
 * @param id - The ID of the season.
 * @returns When finished.
 */
export default async function deleteSeason(id: number) {
	return await db.delete(seasonsTable).where(eq(seasonsTable.id, id));
}
