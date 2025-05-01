"use server";

import { accountTable, draftPlayerTable, playerTable } from "db/schema";
import db from "db/db";
import { eq } from "drizzle-orm";

/**
 * Get draftable player information.
 * @param seasonId - The season ID.
 * @returns Draftable player information.
 * @public
 */
export default async function getDraftablePlayersRows(seasonId: number) {
	return await db
		.select()
		.from(draftPlayerTable)
		.leftJoin(playerTable, eq(draftPlayerTable.playerId, playerTable.id))
		.leftJoin(accountTable, eq(playerTable.id, accountTable.playerId))
		.where(eq(draftPlayerTable.seasonId, seasonId));
}
