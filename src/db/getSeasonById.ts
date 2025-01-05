import db from "./db";
import { eq } from "drizzle-orm";
import { seasonTable } from "./schema";

/**
 * Get a season by its ID.
 * @param id - The ID.
 * @returns The season, if any matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getSeasonById(id: number) {
	return (
		await db.select().from(seasonTable).where(eq(seasonTable.id, id)).limit(1)
	)[0];
}
