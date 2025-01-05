import db from "./db";
import { eq } from "drizzle-orm";
import { gameTable } from "./schema";

/**
 * Get a game by its ID.
 * @param id - The ID.
 * @returns The game, if any matches.
 * @throws `Error` if there is a database error.
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
 * @throws `Error` if there is a database error.
 * @public
 */
export const getGameBySlug = async (slug: number | `${number}`) => {
	const id = typeof slug === "number" ? slug : parseInt(slug, 10);
	return isNaN(id) ? void 0 : getGameById(id);
};
