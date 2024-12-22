import db from "./db";
import { seasonsTable } from "./schema";

/**
 * Get a list of every season.
 * @returns A list of every season.
 * @public
 */
export default async function getAllSeasons(): Promise<
	(typeof seasonsTable.$inferSelect)[]
> {
	return await db.select().from(seasonsTable);
}
