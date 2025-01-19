import {
	accountTable,
	playerTable,
	teamPlayerTable,
	teamTable
} from "./schema";
import db from "./db";
import { eq } from "drizzle-orm";

/**
 * Get a list of every team, including its players and their accounts.
 * @returns A list of every team, including its players and their accounts.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAllTeamsWithAccounts() {
	return await db
		.select()
		.from(teamTable)
		.leftJoin(teamPlayerTable, eq(teamTable.id, teamPlayerTable.teamId))
		.leftJoin(playerTable, eq(teamPlayerTable.playerId, playerTable.id))
		.leftJoin(accountTable, eq(playerTable.id, accountTable.playerId));
}
