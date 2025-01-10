import { eq, or } from "drizzle-orm";
import db from "./db";
import { matchTable } from "./schema";

/**
 * Get matches.
 * @param ids - The IDs of the matches.
 * @returns The matches.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getMatches(...ids: number[]) {
	return await db
		.select()
		.from(matchTable)
		.where(or(...ids.map((id) => eq(matchTable.id, id))));
}
