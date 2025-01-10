import db from "./db";
import { tournamentProviderTable } from "./schema";

/**
 * Get a list of every tournament provider.
 * @returns A list of every tournament provider.
 * @throws `Error` if there is a database error.
 * @public
 */
export default async function getAllTournamentProviders() {
	return await db.select().from(tournamentProviderTable);
}
