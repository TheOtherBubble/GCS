import "utility/env";
import type Cluster from "types/riot/Cluster";
import type ProviderRegistrationParameters from "types/riot/ProviderRegistrationParameters";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

// TODO: Use tournament instead of tournament stub.

/**
 * Get the URL of the Riot API endpoint for making tournament providers.
 * @param cluster - The cluster to use to make the request.
 * @returns The URL.
 */
export const getMakeTournamentProviderUrl = (cluster?: Cluster) =>
	new URL("/lol/tournament-stub/v5/providers", getRiotApiBaseUrl(cluster)).href;

/**
 * Make a tournament provider in the Riot API.
 * @param params - The provider registration parameters.
 * @param cluster - The cluster to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The tournament provider ID.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function makeTournamentProvider(
	params: ProviderRegistrationParameters,
	cluster?: Cluster,
	key?: string
) {
	return (await (
		await riotFetch(
			getMakeTournamentProviderUrl(cluster),
			{ body: JSON.stringify(params), method: "POST" },
			key
		)
	).json()) as number;
}
