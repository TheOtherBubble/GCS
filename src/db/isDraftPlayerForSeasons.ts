import { and, eq, or } from "drizzle-orm";
import db from "./db";
import { draftPlayerTable } from "./schema";

/**
 * Check whether or not the given player is part of the draft for any the given seasons.
 * @param id - The player's ID.
 * @param seasonIds - The IDs of the seasons.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function isDraftPlayerForSeasons(
	id: string,
	...seasonIds: number[]
) {
	return (
		(
			await db
				.select()
				.from(draftPlayerTable)
				.where(
					and(
						eq(draftPlayerTable.playerId, id),
						or(
							...seasonIds.map((seasonId) =>
								eq(draftPlayerTable.seasonId, seasonId)
							)
						)
					)
				)
		).length > 0
	);
}
