import "utility/env";
import type Cluster from "types/riot/Cluster";
import MapType from "types/riot/MapType";
import PickType from "types/riot/PickType";
import SpectatorType from "types/riot/SpectatorType";
import type TournamentCodeParameters from "types/riot/TournamentCodeParameters";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

// TODO: Use tournament instead of tournament stub.

/**
 * Get the URL of the Riot API endpoint for making tournament codes.
 * @param count - The number of tournament codes to make, or `undefined` for one.
 * @param tournamentId - The ID of the tournament that is associated with the tournament codes.
 * @param cluster - The cluster to use to make the request.
 * @returns The URL.
 */
export const getMakeTournamentCodesUrl = (
	count?: number,
	tournamentId?: number,
	cluster?: Cluster
) => {
	const url = new URL(
		"/lol/tournament-stub/v5/codes",
		getRiotApiBaseUrl(cluster)
	);

	if (count) {
		url.searchParams.append("count", count.toString());
	}

	if (tournamentId) {
		url.searchParams.append("tournamentId", tournamentId.toString());
	}

	return url.href;
};

/**
 * Make tournament codes in the Riot API.
 * @param params - The tournament code parameters, or `undefined` to use sensible defaults.
 * @param count - The number of tournament codes to make.
 * @param tournamentId - The ID of the tournament that is associated with the tournament codes.
 * @param cluster - The cluster to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The tournament ID.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function makeTournamentCodes(
	params?: TournamentCodeParameters,
	count?: number,
	tournamentId?: number,
	cluster?: Cluster,
	key?: string
) {
	return (await (
		await riotFetch(
			getMakeTournamentCodesUrl(count, tournamentId, cluster),
			{
				body: JSON.stringify(
					params ?? {
						enoughPlayers: false,
						mapType: MapType.SUMMONERS_RIFT,
						pickType: PickType.TOURNAMENT_DRAFT,
						spectatorType: SpectatorType.ALL,
						teamSize: 5
					}
				),
				method: "POST"
			},
			key
		)
	).json()) as string[];
}
