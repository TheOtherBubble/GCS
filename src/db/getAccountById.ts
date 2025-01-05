import { accountTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get an account by its PUUID.
 * @param puuid - The player universally unique ID (PUUID).
 * @returns The game, if any matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAccountById(puuid: string) {
	return (
		await db
			.select()
			.from(accountTable)
			.where(eq(accountTable.puuid, puuid))
			.limit(1)
	)[0];
}
