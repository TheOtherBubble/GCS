import Region from "types/riot/Region";
import createTournamentProviders from "db/createTournamentProviders";
import domain from "util/domain";
import getAllTournamentProviders from "db/getAllTournamentProviders";
import makeTournamentProvider from "riot/makeTournamentProvider";

/**
 * Get the tournament provider ID from the database or create it if it doesn't exist.
 * @returns The tournament provider ID.
 * @throws `Error` if the response has a bad status, if the Riot API key is missing, or if there is a database error.
 * @public
 */
export default async function getTournamentProviderId() {
	const [provider] = await getAllTournamentProviders();
	if (provider) {
		return provider.id;
	}

	// Make a new tournament provider if none exists.
	const id = await makeTournamentProvider({
		region: Region.NORTH_AMERICA,
		url: new URL("/api/riot", domain).href
	});
	await createTournamentProviders({ id });
	return id;
}
