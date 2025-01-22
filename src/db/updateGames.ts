import { eq, or } from "drizzle-orm";
import type { UpdateGame } from "types/db/Game";
import db from "./db";
import { gameTable } from "./schema";

/**
 * Update a set of games.
 * @param game - The new data to update in the games.
 * @param ids - The IDs of the games.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateGames(game: UpdateGame, ...ids: number[]) {
	await db
		.update(gameTable)
		.set(game)
		.where(or(...ids.map((id) => eq(gameTable.id, id))));
}
