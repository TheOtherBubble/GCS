import { eq, or } from "drizzle-orm";
import type { UpdateAccount } from "types/db/Account";
import { accountTable } from "./schema";
import db from "./db";

/**
 * Update a set of accounts.
 * @param account - The new data to update in the accounts.
 * @param puuids - The player universally unique IDs (PUUIDs) of the accounts.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateAccounts(
	account: UpdateAccount,
	...puuids: string[]
) {
	await db
		.update(accountTable)
		.set(account)
		.where(or(...puuids.map((puuid) => eq(accountTable.puuid, puuid))));
}
