import { type playerTable, teamPlayerTable, teamTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a player's teams.
 * @param player - The player.
 * @returns The player's teams. Includes the team and the team player.
 * @public
 */
export default async function getTeamsByPlayer(
	player: typeof playerTable.$inferSelect
) {
	return await db
		.select()
		.from(teamTable)
		.innerJoin(teamPlayerTable, eq(teamTable.id, teamPlayerTable.teamId))
		.where(eq(teamPlayerTable.playerId, player.id));
}
