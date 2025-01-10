import Cluster from "types/riot/Cluster";
import type ProviderRegistrationParameters from "types/riot/ProviderRegistrationParameters";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

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
	cluster = Cluster.AMERICAS,
	key: string | undefined = void 0
) {
	return (await (
		await riotFetch(
			new URL("/lol/tournament-stub/v5/providers", getRiotApiBaseUrl(cluster))
				.href,
			{ body: JSON.stringify(params), method: "POST" },
			key
		)
	).json()) as number;
}
