import { and, eq, or } from "drizzle-orm";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Determine whether or not a player is on any of the given teams.
 * @param id - The player's ID.
 * @param teamIds - The teams' IDs.
 * @returns Whether or not the player is on any of the given teams.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function isPlayerOnTeams(
	id: string,
	...teamIds: number[]
) {
	return (
		(
			await db
				.select()
				.from(teamPlayerTable)
				.where(
					and(
						eq(teamPlayerTable.playerId, id),
						or(...teamIds.map((teamId) => eq(teamPlayerTable.teamId, teamId)))
					)
				)
		).length > 0
	);
}
