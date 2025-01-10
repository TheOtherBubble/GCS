import { eq, or } from "drizzle-orm";
import { playerTable, teamPlayerTable } from "./schema";
import db from "./db";

/**
 * Get all of a set teams' players.
 * @param ids - The IDs of the teams.
 * @returns The teams' players. Includes the player and the team player.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getPlayersByTeams(...ids: number[]) {
	return await db
		.select()
		.from(playerTable)
		.innerJoin(teamPlayerTable, eq(playerTable.id, teamPlayerTable.playerId))
		.where(or(...ids.map((id) => eq(teamPlayerTable.teamId, id))));
}
