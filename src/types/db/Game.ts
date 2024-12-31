import type { InferUpdate } from "./InferUpdate";
import type { gameTable } from "db/schema";

/**
 * A game, as retrieved from the database.
 * @public
 */
export type Game = typeof gameTable.$inferSelect;

/**
 * A game that can be inserted to the database.
 * @public
 */
export type InsertGame = typeof gameTable.$inferInsert;

/**
 * Information that can be used to update a game in the database.
 * @public
 */
export type UpdateGame = InferUpdate<InsertGame>;
