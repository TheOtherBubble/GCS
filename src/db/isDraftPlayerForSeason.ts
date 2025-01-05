import { and, eq } from "drizzle-orm";
import type { Player } from "types/db/Player";
import type { Season } from "types/db/Season";
import db from "./db";
import { draftPlayerTable } from "./schema";

/**
 * Check whether or not the given player is part of the draft for the given season.
 * @param player - The player.
 * @param season - The season.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function isDraftPlayerForSeason(
	player: Player,
	season: Season
) {
	return (
		(
			await db
				.select()
				.from(draftPlayerTable)
				.where(
					and(
						eq(draftPlayerTable.playerId, player.id),
						eq(draftPlayerTable.seasonId, season.id)
					)
				)
		).length > 0
	);
}
