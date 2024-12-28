import { playerTable, teamPlayerTable, teamTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a team's players.
 * @param team - The team.
 * @returns The team's players. Includes the player and the team player.
 * @public
 */
export default async function getPlayersByTeam(
	team: typeof teamTable.$inferSelect
) {
	return await db
		.select()
		.from(playerTable)
		.innerJoin(teamPlayerTable, eq(playerTable.id, teamPlayerTable.playerId))
		.where(eq(teamPlayerTable.teamId, team.id));
}
