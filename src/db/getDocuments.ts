import { eq, or } from "drizzle-orm";
import db from "./db";
import { documentTable } from "./schema";

/**
 * Get documents.
 * @param ids - The IDs of the documents.
 * @returns The documents.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getDocuments(...ids: number[]) {
	return await db
		.select()
		.from(documentTable)
		.where(or(...ids.map((id) => eq(documentTable.id, id))));
}
