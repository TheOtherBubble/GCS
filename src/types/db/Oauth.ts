import type { InferUpdate } from "./InferUpdate";
import type { oauthTable } from "db/schema";

/**
 * An OAuth account, as retrieved from the database.
 * @public
 */
export type Oauth = typeof oauthTable.$inferSelect;

/**
 * An OAuth account that can be inserted to the database.
 * @public
 */
export type InsertOauth = typeof oauthTable.$inferInsert;

/**
 * Information that can be used to update an OAuth account in the database.
 * @public
 */
export type UpdateOauth = InferUpdate<InsertOauth>;
