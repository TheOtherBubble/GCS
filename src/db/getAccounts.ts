import { eq, or } from "drizzle-orm";
import { accountTable } from "./schema";
import db from "./db";

/**
 * Get accounts.
 * @param puuids - The player universally unique IDs (PUUIDs) of the accounts.
 * @returns The account, if any matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAccounts(...puuids: string[]) {
	return await db
		.select()
		.from(accountTable)
		.where(or(...puuids.map((puuid) => eq(accountTable.puuid, puuid))));
}
