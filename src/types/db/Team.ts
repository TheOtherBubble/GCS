import type { InferUpdate } from "./InferUpdate";
import type { teamTable } from "db/schema";

/**
 * A team, as retrieved from the database.
 * @public
 */
export type Team = typeof teamTable.$inferSelect;

/**
 * A team that can be inserted to the database.
 * @public
 */
export type InsertTeam = typeof teamTable.$inferInsert;

/**
 * Information that can be used to update a team in the database.
 * @public
 */
export type UpdateTeam = InferUpdate<InsertTeam>;
