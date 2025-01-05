import { eq, or } from "drizzle-orm";
import { matchTable, teamTable } from "./schema";
import type { Match } from "types/db/Match";
import db from "./db";

/**
 * Get all of a match's teams.
 * @param id - The match's ID.
 * @returns The match's teams. Includes the match and the teams.
 * @throws `Error` if there is a database error.
 * @public
 */
export const getTeamsByMatchId = async (id: number) =>
	await db
		.select()
		.from(teamTable)
		.innerJoin(
			matchTable,
			or(
				eq(teamTable.id, matchTable.blueTeamId),
				eq(teamTable.id, matchTable.redTeamId)
			)
		)
		.where(eq(matchTable.id, id));

/**
 * Get all of a match's teams.
 * @param slug - The match's stringified ID.
 * @returns The match's teams. Includes the match and the teams.
 * @throws `Error` if there is a database error.
 * @public
 */
export const getTeamsByMatchSlug = async (slug: number | `${number}`) =>
	getTeamsByMatchId(typeof slug === "number" ? slug : parseInt(slug, 10));

/**
 * Get all of a match's teams.
 * @param match - The match.
 * @returns The match's teams. Includes the match and the teams.
 * @public
 */
export default async function getTeamsByMatch(match: Match) {
	return await getTeamsByMatchId(match.id);
}
