import { eq, or } from "drizzle-orm";
import db from "./db";
import { gameTable } from "./schema";

/**
 * Get games.
 * @param ids - The games' IDs.
 * @returns The game, if any matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getGames(...ids: number[]) {
	return await db
		.select()
		.from(gameTable)
		.where(or(...ids.map((id) => eq(gameTable.id, id))));
}
