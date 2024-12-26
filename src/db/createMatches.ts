import db from "./db";
import { matchTable } from "./schema";

/**
 * Create matches.
 * @param matches - The matches.
 * @returns When finished.
 */
export default async function createMatches(
	matches: (typeof matchTable.$inferInsert)[]
) {
	return await db.insert(matchTable).values(matches);
	// TODO: Create the first game in each match.
}
