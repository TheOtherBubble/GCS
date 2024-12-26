import db from "./db";
import { matchesTable } from "./schema";

/**
 * Create a match.
 * @param match - The match.
 * @returns When finished.
 */
export default async function createMatch(
	match: typeof matchesTable.$inferInsert
) {
	return await db.insert(matchesTable).values(match);
	// TODO: Create the first game in the match.
}
