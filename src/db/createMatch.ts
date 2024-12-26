import db from "./db";
import { matchTable } from "./schema";

/**
 * Create a match.
 * @param match - The match.
 * @returns When finished.
 */
export default async function createMatch(
	match: typeof matchTable.$inferInsert
) {
	return await db.insert(matchTable).values(match);
	// TODO: Create the first game in the match.
}
