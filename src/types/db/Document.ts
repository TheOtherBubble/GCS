import type { InferUpdate } from "./InferUpdate";
import type { documentTable } from "db/schema";

/**
 * A document, as retrieved from the database.
 * @public
 */
export type Document = typeof documentTable.$inferSelect;

/**
 * A document that can be inserted to the database.
 * @public
 */
export type InsertDocument = typeof documentTable.$inferInsert;

/**
 * Information that can be used to update a document in the database.
 * @public
 */
export type UpdateDocument = InferUpdate<InsertDocument>;
