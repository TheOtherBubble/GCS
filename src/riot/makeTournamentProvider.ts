import type ProviderRegistrationParameters from "types/riot/ProviderRegistrationParameters";
import getClusterForPlatform from "util/getClusterForPlatform";
import getPlatformForRegion from "util/getPlatformForRegion";
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
	cluster = getClusterForPlatform(getPlatformForRegion(params.region)),
	key: string | undefined = void 0
): Promise<number> {
	return (await (
		await riotFetch(
			new URL("/lol/tournament/v5/providers", getRiotApiBaseUrl(cluster)).href,
			{ body: JSON.stringify(params), method: "POST" },
			key
		)
	).json()) as number;
}
