import type { InferUpdate } from "./InferUpdate";
import type { tournamentProviderTable } from "db/schema";

/**
 * A tournament provider, as retrieved from the database.
 * @public
 */
export type TournamentProvider = typeof tournamentProviderTable.$inferSelect;

/**
 * A tournament provider that can be inserted to the database.
 * @public
 */
export type InsertTournamentProvider =
	typeof tournamentProviderTable.$inferInsert;

/**
 * Information that can be used to update a tournament provider in the database.
 * @public
 */
export type UpdateTournamentProvider = InferUpdate<InsertTournamentProvider>;
