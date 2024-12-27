import { type playerTable, teamPlayerTable } from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get all of a player's teams.
 * @param player - The player.
 * @returns The player's teams.
 * @public
 */
export default async function getTeamPlayersByPlayer(
	player: typeof playerTable.$inferSelect
) {
	return await db
		.select()
		.from(teamPlayerTable)
		.where(eq(teamPlayerTable.playerId, player.id));
}
