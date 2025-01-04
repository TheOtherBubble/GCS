import type { UpdatePlayer } from "types/db/Player";
import db from "./db";
import { eq } from "drizzle-orm";
import { playerTable } from "./schema";

/**
 * Update a player.
 * @param id - The ID of the player.
 * @param player - The new data to update in the player.
 * @returns When finished.
 */
export default async function updatePlayer(id: string, player: UpdatePlayer) {
	await db.update(playerTable).set(player).where(eq(playerTable.id, id));
}
