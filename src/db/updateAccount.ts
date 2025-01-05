import type { UpdateAccount } from "types/db/Account";
import { accountTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Update an account.
 * @param puuid - The player universally unique ID of the account.
 * @param account - The new data to update in the account.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateAccount(
	puuid: string,
	account: UpdateAccount
) {
	await db
		.update(accountTable)
		.set(account)
		.where(eq(accountTable.puuid, puuid));
}
