import db from "./db";
import { seasonTable } from "./schema";

/**
 * Create a season.
 * @param season - The season.
 * @returns When finished.
 */
export default async function createSeason(
	season: typeof seasonTable.$inferInsert
) {
	return await db.insert(seasonTable).values(season);
}
