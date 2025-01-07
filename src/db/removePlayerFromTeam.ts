import { and, eq } from "drizzle-orm";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Remove a player from a team.
 * @param playerId - The ID of the player.
 * @param teamId - The ID of the team.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function removePlayerFromTeam(
	playerId: string,
	teamId: number
) {
	await db
		.delete(teamPlayerTable)
		.where(
			and(
				eq(teamPlayerTable.playerId, playerId),
				eq(teamPlayerTable.teamId, teamId)
			)
		);
}
