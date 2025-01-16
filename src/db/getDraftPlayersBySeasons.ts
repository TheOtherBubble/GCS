import { draftPlayerTable, playerTable } from "./schema";
import { eq, or } from "drizzle-orm";
import db from "./db";

/**
 * Get the draft players for all of the given seasons.
 * @param ids - The IDs of the seasons.
 * @returns The draft players. Includes the draft player and the player.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getDraftPlayersBySeasons(...ids: number[]) {
	return await db
		.select()
		.from(draftPlayerTable)
		.innerJoin(playerTable, eq(draftPlayerTable.playerId, playerTable.id))
		.where(or(...ids.map((id) => eq(draftPlayerTable.seasonId, id))));
}
