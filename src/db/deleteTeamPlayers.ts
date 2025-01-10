import { and, eq, or } from "drizzle-orm";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Remove a player from a set of teams.
 * @param id - The ID of the player.
 * @param teamIds - The IDs of the teams.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function deleteTeamPlayers(
	id: string,
	...teamIds: number[]
) {
	await db
		.delete(teamPlayerTable)
		.where(
			and(
				eq(teamPlayerTable.playerId, id),
				or(...teamIds.map((teamId) => eq(teamPlayerTable.teamId, teamId)))
			)
		);
}
