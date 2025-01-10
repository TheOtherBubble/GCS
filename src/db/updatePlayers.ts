import { eq, or } from "drizzle-orm";
import type { UpdatePlayer } from "types/db/Player";
import db from "./db";
import { playerTable } from "./schema";

/**
 * Update a set of players.
 * @param player - The new data to update in the players.
 * @param ids - The IDs of the players.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updatePlayers(
	player: UpdatePlayer,
	...ids: string[]
) {
	await db
		.update(playerTable)
		.set(player)
		.where(or(...ids.map((id) => eq(playerTable.id, id))));
}
