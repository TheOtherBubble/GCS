import { eq, or } from "drizzle-orm";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Get all of a set of players' team players.
 * @param ids - The IDs of the players.
 * @returns The players' team players.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getTeamPlayersByPlayers(...ids: string[]) {
	return await db
		.select()
		.from(teamPlayerTable)
		.where(or(...ids.map((id) => eq(teamPlayerTable.playerId, id))));
}
