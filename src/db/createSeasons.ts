import type { InsertSeason } from "types/db/Season";
import db from "./db";
import { seasonTable } from "./schema";

/**
 * Create seasons.
 * @param seasons - The seasons.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createSeasons(...seasons: InsertSeason[]) {
	return await db.insert(seasonTable).values(seasons);
}
