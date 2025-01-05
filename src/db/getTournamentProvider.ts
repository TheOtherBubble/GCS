import Region from "types/riot/Region";
import db from "./db";
import domain from "util/domain";
import makeTournamentProvider from "riot/makeTournamentProvider";
import { tournamentProviderTable } from "./schema";

/**
 * Get the tournament provider from the database or create it if it doesn't exist.
 * @returns The tournament provider.
 * @throws `Error` if the response has a bad status, if the Riot API key is missing, or if there is a database error.
 * @public
 */
export default async function getTournamentProvider() {
	const [provider] = await db.select().from(tournamentProviderTable).limit(1);
	if (provider) {
		return provider.id;
	}

	// Make a new tournament provider if none exists.
	const id = await makeTournamentProvider({
		region: Region.NORTH_AMERICA,
		url: new URL("/api/riot", domain).href
	});
	await db.insert(tournamentProviderTable).values({ id });
	return id;
}
