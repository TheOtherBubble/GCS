import type { InsertPlayerGameResult } from "types/db/PlayerGameResult";
import db from "./db";
import { playerGameResultTable } from "./schema";

/**
 * Create player game results.
 * @param playerGameResults - The player game results.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createPlayerGameResults(
	...playerGameResults: InsertPlayerGameResult[]
) {
	return await db.insert(playerGameResultTable).values(playerGameResults);
}
