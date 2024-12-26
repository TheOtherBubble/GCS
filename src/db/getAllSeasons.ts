import db from "./db";
import { seasonTable } from "./schema";

/**
 * Get a list of every season.
 * @returns A list of every season.
 * @public
 */
export default async function getAllSeasons() {
	return await db.select().from(seasonTable);
}
