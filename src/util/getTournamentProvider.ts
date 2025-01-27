import Region from "types/riot/Region";
import db from "db/db";
import domain from "util/domain";
import makeTournamentProvider from "riot/makeTournamentProvider";
import { tournamentProviderTable } from "db/schema";

/**
 * Get the GCS tournament provider from the database or create it if it doesn't exist.
 * @return The GCS tournament provider.
 * @throws `Error` if the response has a bad status, if the Riot API key is missing, or if there is a database error.
 * @public
 */
export default async function getTournamentProvider(): Promise<
	typeof tournamentProviderTable.$inferSelect
> {
	let [provider] = await db.select().from(tournamentProviderTable).limit(1);
	if (provider) {
		return provider;
	}

	// Make a new tournament provider if none exists.
	[provider] = await db
		.insert(tournamentProviderTable)
		.values({
			id: await makeTournamentProvider({
				region: Region.NORTH_AMERICA,
				url: new URL("/api/riot", domain).href
			})
		})
		.returning();
	if (provider) {
		return provider;
	}

	throw new Error("Failed to return a tournament provider.");
}
