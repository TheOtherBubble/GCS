import { playerTable, teamPlayerTable } from "./schema";
import type { Team } from "types/db/Team";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a team's players.
 * @param teamId - The team's ID.
 * @returns The team's players. Includes the player and the team player.
 * @throws `Error` if there is a database error.
 * @public
 */
export const getPlayersByTeamId = async (teamId: number) =>
	await db
		.select()
		.from(playerTable)
		.innerJoin(teamPlayerTable, eq(playerTable.id, teamPlayerTable.playerId))
		.where(eq(teamPlayerTable.teamId, teamId));

/**
 * Get all of a team's players.
 * @param team - The team.
 * @returns The team's players. Includes the player and the team player.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getPlayersByTeam(team: Team) {
	return await getPlayersByTeamId(team.id);
}
