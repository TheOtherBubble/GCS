import { and, eq, or } from "drizzle-orm";
import type { UpdateTeamPlayer } from "types/db/TeamPlayer";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Update a set of team players.
 * @param teamPlayer - The new data to update in the team players.
 * @param playerId - The player ID of the team players.
 * @param teamIds - The team IDs of the team players.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateTeamPlayersByTeams(
	teamPlayer: UpdateTeamPlayer,
	playerId: string,
	...teamIds: number[]
) {
	await db
		.update(teamPlayerTable)
		.set(teamPlayer)
		.where(
			and(
				eq(teamPlayerTable.playerId, playerId),
				or(...teamIds.map((id) => eq(teamPlayerTable.teamId, id)))
			)
		);
}
