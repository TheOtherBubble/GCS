import type { Player } from "types/db/Player";
import { accountTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a player's accounts.
 * @param player - The player.
 * @returns The player's accounts.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAccountsByPlayer(player: Player) {
	return await db
		.select()
		.from(accountTable)
		.where(eq(accountTable.playerId, player.id));
}
