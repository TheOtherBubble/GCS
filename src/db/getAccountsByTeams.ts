import { accountTable, playerTable, teamPlayerTable } from "./schema";
import { eq, or } from "drizzle-orm";
import db from "./db";

/**
 * Get all of a set of teams' players' accounts.
 * @param ids - The IDs of the teams.
 * @returns The teams' accounts. Includes the players, team players, and accounts.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAccountsByTeams(...ids: number[]) {
	return await db
		.select()
		.from(accountTable)
		.innerJoin(playerTable, eq(accountTable.playerId, playerTable.id))
		.innerJoin(teamPlayerTable, eq(playerTable.id, teamPlayerTable.playerId))
		.where(or(...ids.map((id) => eq(teamPlayerTable.teamId, id))));
}
