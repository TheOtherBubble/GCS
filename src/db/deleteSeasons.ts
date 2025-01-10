import { eq, or } from "drizzle-orm";
import db from "./db";
import { seasonTable } from "./schema";

/**
 * Delete seasons.
 * @param ids - The IDs of the seasons.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function deleteSeasons(...ids: number[]) {
	return await db
		.delete(seasonTable)
		.where(or(...ids.map((id) => eq(seasonTable.id, id))));
}
