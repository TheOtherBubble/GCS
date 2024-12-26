import { eq, or } from "drizzle-orm";
import { matchesTable, teamsTable } from "./schema";
import db from "./db";

/**
 * Get all of a match's teams.
 * @param id - The match's ID.
 * @returns The match's teams. Includes the match and the teams.
 * @public
 */
export const getTeamsByMatchId = async (id: number) =>
	await db
		.select()
		.from(teamsTable)
		.innerJoin(
			matchesTable,
			or(
				eq(teamsTable.id, matchesTable.blueTeamId),
				eq(teamsTable.id, matchesTable.redTeamId)
			)
		)
		.where(eq(matchesTable.id, id));

/**
 * Get all of a match's teams.
 * @param slug - The match's stringified ID.
 * @returns The match's teams. Includes the match and the teams.
 * @public
 */
export const getTeamsByMatchSlug = async (slug: string) =>
	getTeamsByMatchId(parseInt(slug, 10));

/**
 * Get all of a match's teams.
 * @param match - The match.
 * @returns The match's teams. Includes the match and the teams.
 * @public
 */
export default async function getTeamsByMatch(
	match: typeof matchesTable.$inferSelect
) {
	return await getTeamsByMatchId(match.id);
}
