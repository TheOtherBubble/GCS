import type { InferUpdate } from "./InferUpdate";
import type { matchTable } from "db/schema";

/**
 * A match, as retrieved from the database.
 * @public
 */
export type Match = typeof matchTable.$inferSelect;

/**
 * A match that can be inserted to the database.
 * @public
 */
export type InsertMatch = typeof matchTable.$inferInsert;

/**
 * Information that can be used to update a match in the database.
 * @public
 */
export type UpdateMatch = InferUpdate<InsertMatch>;
