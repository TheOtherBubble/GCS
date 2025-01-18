import { eq, or } from "drizzle-orm";
import type { UpdateDocument } from "types/db/Document";
import db from "./db";
import { documentTable } from "./schema";

/**
 * Update a set of documents.
 * @param document - The new data to update in the documents.
 * @param ids - The IDs of the documents.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function updateDocuments(
	document: UpdateDocument,
	...ids: number[]
) {
	await db
		.update(documentTable)
		.set(document)
		.where(or(...ids.map((id) => eq(documentTable.id, id))));
}
