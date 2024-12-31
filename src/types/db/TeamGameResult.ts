import type { InferUpdate } from "./InferUpdate";
import type { teamGameResultTable } from "db/schema";

/**
 * A team game result, as retrieved from the database.
 * @public
 */
export type TeamGameResult = typeof teamGameResultTable.$inferSelect;

/**
 * A team game result that can be inserted to the database.
 * @public
 */
export type InsertTeamGameResult = typeof teamGameResultTable.$inferInsert;

/**
 * Information that can be used to update a team game result in the database.
 * @public
 */
export type UpdateTeamGameResult = InferUpdate<InsertTeamGameResult>;
