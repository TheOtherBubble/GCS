import { eq, or } from "drizzle-orm";
import type { UpdateAccount } from "types/db/Account";
import { accountTable } from "./schema";
import db from "./db";

/**
 * Update all of a set of players' accounts.
 * @param account - The new data to update in the accounts.
 * @param ids - The IDs of the players to update the accounts of.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateAccountsByPlayer(
	account: UpdateAccount,
	...ids: string[]
) {
	await db
		.update(accountTable)
		.set(account)
		.where(or(...ids.map((id) => eq(accountTable.playerId, id))));
}
