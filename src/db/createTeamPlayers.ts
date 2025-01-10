import type { InsertTeamPlayer } from "types/db/TeamPlayer";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Create team players.
 * @param teamPlayers - The team players.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createTeamPlayers(
	...teamPlayers: InsertTeamPlayer[]
) {
	return await db.insert(teamPlayerTable).values(teamPlayers);
}
