import db from "./db";
import { eq } from "drizzle-orm";
import { gameTable } from "./schema";

/**
 * Get a game by its ID.
 * @param id - The ID.
 * @returns The game, if any matches.
 * @public
 */
export default async function getGameById(id: number) {
	return (
		await db.select().from(gameTable).where(eq(gameTable.id, id)).limit(1)
	)[0];
}

/**
 * Get a game by its stringified ID.
 * @param slug - The stringified ID.
 * @returns The game, if any matches.
 * @public
 */
export const getGameBySlug = async (slug: string) => {
	const id = parseInt(slug, 10);
	return isNaN(id) ? void 0 : getGameById(id);
};
