import type { InferUpdate } from "./InferUpdate";
import type { sessionTable } from "db/schema";

/**
 * A session, as retrieved from the database.
 * @public
 */
export type Session = typeof sessionTable.$inferSelect;

/**
 * A session that can be inserted to the database.
 * @public
 */
export type InsertSession = typeof sessionTable.$inferInsert;

/**
 * Information that can be used to update a session in the database.
 * @public
 */
export type UpdateSession = InferUpdate<InsertSession>;
