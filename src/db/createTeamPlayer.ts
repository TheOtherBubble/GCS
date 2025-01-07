import type { InsertTeamPlayer } from "types/db/TeamPlayer";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Create a team player.
 * @param teamPlayer - The team player.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createTeamPlayer(teamPlayer: InsertTeamPlayer) {
	await db.insert(teamPlayerTable).values(teamPlayer);
}
