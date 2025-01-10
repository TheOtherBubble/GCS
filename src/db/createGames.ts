import type { InsertGame } from "types/db/Game";
import db from "./db";
import { gameTable } from "./schema";

/**
 * Create games.
 * @param games - The games.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createGames(...games: InsertGame[]) {
	return await db.insert(gameTable).values(games);
}
