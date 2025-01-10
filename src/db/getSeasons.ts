import { eq, or } from "drizzle-orm";
import db from "./db";
import { seasonTable } from "./schema";

/**
 * Get seasons.
 * @param ids - The IDs of the seasons.
 * @returns The seasons.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getSeasons(...ids: number[]) {
	return await db
		.select()
		.from(seasonTable)
		.where(or(...ids.map((id) => eq(seasonTable.id, id))));
}
