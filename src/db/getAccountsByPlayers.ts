import { eq, or } from "drizzle-orm";
import { accountTable } from "./schema";
import db from "./db";

/**
 * Get all of a set of player's accounts.
 * @param ids - The IDs of the players.
 * @returns The players' accounts.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAccountsByPlayers(...ids: string[]) {
	return await db
		.select()
		.from(accountTable)
		.where(or(...ids.map((id) => eq(accountTable.playerId, id))));
}
