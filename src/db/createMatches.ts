import type { InsertMatch } from "types/db/Match";
import db from "./db";
import { matchTable } from "./schema";

/**
 * Create matches.
 * @param matches - The matches.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createMatches(...matches: InsertMatch[]) {
	return await db.insert(matchTable).values(matches).returning(); // `returning` because created matches may need to be used for generating games.
}
