import { and, eq, or } from "drizzle-orm";
import type { UpdateTeamPlayer } from "types/db/TeamPlayer";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Update a set of team players.
 * @param teamPlayer - The new data to update in the team players.
 * @param teamId - The team ID of the team players.
 * @param playerIds - The player IDs of the team players.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateTeamPlayers(
	teamPlayer: UpdateTeamPlayer,
	teamId: number,
	...playerIds: string[]
) {
	await db
		.update(teamPlayerTable)
		.set(teamPlayer)
		.where(
			and(
				eq(teamPlayerTable.teamId, teamId),
				or(...playerIds.map((id) => eq(teamPlayerTable.playerId, id)))
			)
		);
}
