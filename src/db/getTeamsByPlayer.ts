import type { Player } from "types/db/Player";
import db from "./db";
import { eq } from "drizzle-orm";
import { teamPlayerTable } from "./schema";

/**
 * Get all of a player's teams.
 * @param player - The player.
 * @returns The player's teams.
 * @public
 */
export default async function getTeamsByPlayer(player: Player) {
	return await db
		.select()
		.from(teamPlayerTable)
		.where(eq(teamPlayerTable.playerId, player.id));
}
