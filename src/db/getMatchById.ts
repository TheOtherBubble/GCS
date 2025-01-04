import db from "./db";
import { eq } from "drizzle-orm";
import { matchTable } from "./schema";

/**
 * Get a match by its ID.
 * @param id - The ID.
 * @returns The match, if any matches.
 * @public
 */
export default async function getMatchById(id: number) {
	return (
		await db.select().from(matchTable).where(eq(matchTable.id, id)).limit(1)
	)[0];
}

/**
 * Get a match by its stringified ID.
 * @param slug - The stringified ID.
 * @returns The match, if any matches.
 * @public
 */
export const getMatchBySlug = async (slug: number | `${number}`) => {
	const id = typeof slug === "number" ? slug : parseInt(slug, 10);
	return isNaN(id) ? void 0 : getMatchById(id);
};
