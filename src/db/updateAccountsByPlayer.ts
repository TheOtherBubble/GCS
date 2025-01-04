import type { Player } from "types/db/Player";
import type { UpdateAccount } from "types/db/Account";
import { accountTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Update all of a player's accounts.
 * @param player - The player to update the accounts of.
 * @param account - The new data to update in the account.
 * @returns When finished.
 */
export default async function updateAccountsByPlayer(
	player: Player,
	account: UpdateAccount
) {
	await db
		.update(accountTable)
		.set(account)
		.where(eq(accountTable.playerId, player.id));
}
