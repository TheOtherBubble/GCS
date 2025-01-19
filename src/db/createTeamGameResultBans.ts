import type { InsertTeamGameResultBan } from "types/db/TeamGameResultBan";
import db from "./db";
import { teamGameResultBanTable } from "./schema";

/**
 * Create team game result bans.
 * @param teamGameResultBans - The team game result bans.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createTeamGameResultBans(
	...teamGameResultBans: InsertTeamGameResultBan[]
) {
	return await db.insert(teamGameResultBanTable).values(teamGameResultBans);
}
