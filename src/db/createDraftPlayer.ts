import type { InsertDraftPlayer } from "types/db/DraftPlayer";
import db from "./db";
import { draftPlayerTable } from "./schema";

/**
 * Create a draft player.
 * @param draftPlayer - The draft player.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createDraftPlayer(
	draftPlayer: InsertDraftPlayer
) {
	await db.insert(draftPlayerTable).values(draftPlayer);
}
