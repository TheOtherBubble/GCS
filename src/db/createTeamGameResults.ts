import type { InsertTeamGameResult } from "types/db/TeamGameResult";
import db from "./db";
import { teamGameResultTable } from "./schema";

/**
 * Create team game results.
 * @param teamGameResults - The team game results.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createTeamGameResults(
	...teamGameResults: InsertTeamGameResult[]
) {
	return await db.insert(teamGameResultTable).values(teamGameResults);
}
