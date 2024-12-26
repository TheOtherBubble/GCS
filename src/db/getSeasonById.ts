import db from "./db";
import { eq } from "drizzle-orm";
import { seasonsTable } from "./schema";

/**
 * Get a season by its ID.
 * @param id - The ID.
 * @returns The season, if any matches.
 * @public
 */
export default async function getSeasonById(id: number) {
	return (
		await db.select().from(seasonsTable).where(eq(seasonsTable.id, id)).limit(1)
	)[0];
}
