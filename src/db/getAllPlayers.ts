import db from "./db";
import { playerTable } from "./schema";

/**
 * Get a list of every player.
 * @returns A list of every player.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAllPlayers() {
	return await db.select().from(playerTable);
}
