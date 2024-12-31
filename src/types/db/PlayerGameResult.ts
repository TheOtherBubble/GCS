import type { InferUpdate } from "./InferUpdate";
import type { playerGameResultTable } from "db/schema";

/**
 * A player game result, as retrieved from the database.
 * @public
 */
export type PlayerGameResult = typeof playerGameResultTable.$inferSelect;

/**
 * A player game result that can be inserted to the database.
 * @public
 */
export type InsertPlayerGameResult = typeof playerGameResultTable.$inferInsert;

/**
 * Information that can be used to update a player game result in the database.
 * @public
 */
export type UpdatePlayerGameResult = InferUpdate<InsertPlayerGameResult>;
