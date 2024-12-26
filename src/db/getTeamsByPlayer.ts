import { type playersTable, teamPlayersTable, teamsTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a player's teams.
 * @param player - The player.
 * @returns The player's teams. Includes the team and the team player.
 * @public
 */
export default async function getTeamsByPlayer(
	player: typeof playersTable.$inferSelect
) {
	return await db
		.select()
		.from(teamsTable)
		.innerJoin(teamPlayersTable, eq(teamsTable.id, teamPlayersTable.teamId))
		.where(eq(teamPlayersTable.playerId, player.id));
}
