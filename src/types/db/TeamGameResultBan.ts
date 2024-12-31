import type { InferUpdate } from "./InferUpdate";
import type { teamGameResultBanTable } from "db/schema";

/**
 * A team game result ban, as retrieved from the database.
 * @public
 */
export type TeamGameResultBan = typeof teamGameResultBanTable.$inferSelect;

/**
 * A team game result ban that can be inserted to the database.
 * @public
 */
export type InsertTeamGameResultBan =
	typeof teamGameResultBanTable.$inferInsert;

/**
 * Information that can be used to update a team game result ban in the database.
 * @public
 */
export type UpdateTeamGameResultBan = InferUpdate<InsertTeamGameResultBan>;
