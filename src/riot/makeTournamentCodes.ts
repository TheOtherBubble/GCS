import Cluster from "types/riot/Cluster";
import MapType from "types/riot/MapType";
import PickType from "types/riot/PickType";
import SpectatorType from "types/riot/SpectatorType";
import type TournamentCodeParameters from "types/riot/TournamentCodeParameters";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

/**
 * Make tournament codes in the Riot API.
 * @param params - The tournament code parameters, or `undefined` to use sensible defaults.
 * @param count - The number of tournament codes to make.
 * @param tournamentId - The ID of the tournament that is associated with the tournament codes.
 * @param cluster - The cluster to use to make the request.
 * @param key - The Riot API key to use.
 * @return The tournament ID.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function makeTournamentCodes(
	params?: TournamentCodeParameters,
	count?: number,
	tournamentId?: number,
	cluster: Cluster = Cluster.AMERICAS,
	key: string | undefined = void 0
): Promise<string[]> {
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

	return (await (
		await riotFetch(
			url.href,
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
