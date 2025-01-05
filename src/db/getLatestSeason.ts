import db from "./db";
import { desc } from "drizzle-orm";
import { seasonTable } from "./schema";

/**
 * Get the latest season by start date.
 * @returns The season, if any exists.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getLatestSeason() {
	return (
		await db
			.select()
			.from(seasonTable)
			.orderBy(desc(seasonTable.startDate))
			.limit(1)
	)[0];
}
