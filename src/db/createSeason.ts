import db from "./db";
import { seasonsTable } from "./schema";

/**
 * Create a season.
 * @param season - The season.
 * @returns When finished.
 */
export default async function createSeason(
	season: typeof seasonsTable.$inferInsert
) {
	return await db.insert(seasonsTable).values(season);
}
