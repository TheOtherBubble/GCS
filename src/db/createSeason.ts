import type { InsertSeason } from "types/db/Season";
import db from "./db";
import { seasonTable } from "./schema";

/**
 * Create a season.
 * @param season - The season.
 * @returns When finished.
 */
export default async function createSeason(season: InsertSeason) {
	return await db.insert(seasonTable).values(season);
}
