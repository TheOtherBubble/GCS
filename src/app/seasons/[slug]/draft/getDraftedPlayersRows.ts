"use server";

import { and, eq } from "drizzle-orm";
import {
	draftPlayerTable,
	playerTable,
	teamPlayerTable,
	teamTable
} from "db/schema";
import db from "db/db";

/**
 * Get draftable player information.
 * @param seasonId - The season ID.
 * @returns Draftable player information.
 * @public
 */
export default async function getDraftedPlayersRows(seasonId: number) {
	return await db
		.select()
		.from(draftPlayerTable)
		.innerJoin(playerTable, eq(draftPlayerTable.playerId, playerTable.id))
		.innerJoin(teamPlayerTable, eq(playerTable.id, teamPlayerTable.playerId))
		.innerJoin(teamTable, eq(teamPlayerTable.teamId, teamTable.id))
		.where(
			and(
				eq(draftPlayerTable.seasonId, seasonId),
				eq(teamTable.seasonId, seasonId)
			)
		);
}
