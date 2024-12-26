import { accountsTable, type playersTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a player's accounts.
 * @param player - The player.
 * @returns The player's accounts.
 * @public
 */
export default async function getAccountsByPlayer(
	player: typeof playersTable.$inferSelect
) {
	return await db
		.select()
		.from(accountsTable)
		.where(eq(accountsTable.playerId, player.id));
}
