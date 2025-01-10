import { eq, or } from "drizzle-orm";
import db from "./db";
import { teamPlayerTable } from "./schema";

/**
 * Get all of a set of players' teams.
 * @param ids - The IDs of the players.
 * @returns The players' teams.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getTeamsByPlayers(...ids: string[]) {
	return await db
		.select()
		.from(teamPlayerTable)
		.where(or(...ids.map((id) => eq(teamPlayerTable.playerId, id))));
}
