import type { InferUpdate } from "./InferUpdate";
import type { draftPlayerTable } from "db/schema";

/**
 * A draft player, as retrieved from the database.
 * @public
 */
export type DraftPlayer = typeof draftPlayerTable.$inferSelect;

/**
 * A draft player that can be inserted to the database.
 * @public
 */
export type InsertDraftPlayer = typeof draftPlayerTable.$inferInsert;

/**
 * Information that can be used to update a draft player in the database.
 * @public
 */
export type UpdateDraftPlayer = InferUpdate<InsertDraftPlayer>;
