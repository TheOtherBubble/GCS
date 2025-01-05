import type { InsertSeason } from "types/db/Season";
import db from "./db";
import { seasonTable } from "./schema";

/**
 * Create a season.
 * @param season - The season.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createSeason(season: InsertSeason) {
	await db.insert(seasonTable).values(season);
}
