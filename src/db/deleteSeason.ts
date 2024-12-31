import db from "./db";
import { eq } from "drizzle-orm";
import { seasonTable } from "./schema";

/**
 * Delete a season.
 * @param id - The ID of the season.
 * @returns When finished.
 */
export default async function deleteSeason(id: number) {
	await db.delete(seasonTable).where(eq(seasonTable.id, id));
}
