import type { InferUpdate } from "./InferUpdate";
import type { accountTable } from "db/schema";

/**
 * An account, as retrieved from the database.
 * @public
 */
export type Account = typeof accountTable.$inferSelect;

/**
 * An account that can be inserted to the database.
 * @public
 */
export type InsertAccount = typeof accountTable.$inferInsert;

/**
 * Information that can be used to update an account in the database.
 * @public
 */
export type UpdateAccount = InferUpdate<InsertAccount>;
