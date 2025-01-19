import type { InsertGameResult } from "types/db/GameResult";
import db from "./db";
import { gameResultTable } from "./schema";

/**
 * Create game results.
 * @param gameResults - The game results.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createGameResults(
	...gameResults: InsertGameResult[]
) {
	return await db.insert(gameResultTable).values(gameResults);
}
