import db from "./db";
import { matchesTable } from "./schema";

/**
 * Create matches.
 * @param matches - The matches.
 * @returns When finished.
 */
export default async function createMatches(
	matches: (typeof matchesTable.$inferInsert)[]
) {
	return await db.insert(matchesTable).values(matches);
	// TODO: Create the first game in each match.
}
