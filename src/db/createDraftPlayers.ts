import type { InsertDraftPlayer } from "types/db/DraftPlayer";
import db from "./db";
import { draftPlayerTable } from "./schema";

/**
 * Create draft players.
 * @param draftPlayers - The draft players.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createDraftPlayers(
	...draftPlayers: InsertDraftPlayer[]
) {
	return await db.insert(draftPlayerTable).values(draftPlayers);
}
