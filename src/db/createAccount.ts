import type { InsertAccount } from "types/db/Account";
import { accountTable } from "./schema";
import db from "./db";

/**
 * Create an account.
 * @param account - The account.
 * @returns When finished.
 */
export default async function createAccount(account: InsertAccount) {
	await db.insert(accountTable).values(account);
}
