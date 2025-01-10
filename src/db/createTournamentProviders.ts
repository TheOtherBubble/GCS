import type { InsertTournamentProvider } from "types/db/TournamentProvider";
import db from "./db";
import { tournamentProviderTable } from "./schema";

/**
 * Create tournament providers.
 * @param tournamentProviders - The tournament providers.
 * @returns When finished.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function createTournamentProviders(
	...tournamentProviders: InsertTournamentProvider[]
) {
	return await db.insert(tournamentProviderTable).values(tournamentProviders);
}
