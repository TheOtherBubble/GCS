import type { InferUpdate } from "./InferUpdate";
import type { gameResultTable } from "db/schema";

/**
 * A game result, as retrieved from the database.
 * @public
 */
export type GameResult = typeof gameResultTable.$inferSelect;

/**
 * A game result that can be inserted to the database.
 * @public
 */
export type InsertGameResult = typeof gameResultTable.$inferInsert;

/**
 * Information that can be used to update a game result in the database.
 * @public
 */
export type UpdateGameResult = InferUpdate<InsertGameResult>;
