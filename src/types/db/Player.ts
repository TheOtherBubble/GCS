import type { InferUpdate } from "./InferUpdate";
import type { playerTable } from "db/schema";

/**
 * A player, as retrieved from the database.
 * @public
 */
export type Player = typeof playerTable.$inferSelect;

/**
 * A player that can be inserted to the database.
 * @public
 */
export type InsertPlayer = typeof playerTable.$inferInsert;

/**
 * Information that can be used to update a player in the database.
 * @public
 */
export type UpdatePlayer = InferUpdate<InsertPlayer>;
