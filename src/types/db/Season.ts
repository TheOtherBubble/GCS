import type { InferUpdate } from "./InferUpdate";
import type { seasonTable } from "db/schema";

/**
 * A season, as retrieved from the database.
 * @public
 */
export type Season = typeof seasonTable.$inferSelect;

/**
 * A season that can be inserted to the database.
 * @public
 */
export type InsertSeason = typeof seasonTable.$inferInsert;

/**
 * Information that can be used to update a season in the database.
 * @public
 */
export type UpdateSeason = InferUpdate<InsertSeason>;
