import type { InsertAccount } from "types/db/Account";
import { accountTable } from "./schema";
import db from "./db";

/**
 * Create accounts.
 * @param accounts - The accounts.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createAccounts(...accounts: InsertAccount[]) {
	return await db.insert(accountTable).values(accounts);
}
