import type { InferUpdate } from "./InferUpdate";
import type { teamPlayerTable } from "db/schema";

/**
 * A team player, as retrieved from the database.
 * @public
 */
export type TeamPlayer = typeof teamPlayerTable.$inferSelect;

/**
 * A team player that can be inserted to the database.
 * @public
 */
export type InsertTeamPlayer = typeof teamPlayerTable.$inferInsert;

/**
 * Information that can be used to update a team player in the database.
 * @public
 */
export type UpdateTeamPlayer = InferUpdate<InsertTeamPlayer>;
