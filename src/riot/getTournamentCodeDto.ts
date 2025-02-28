import Cluster from "types/riot/Cluster";
import type TournamentCodeDto from "types/riot/TournamentCodeDto";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

/**
 * Get details about a tournament code in the Riot API.
 * @param code - The tournament code.
 * @param platform - The platform to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The details about the tournament code.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getTournamentCodeDto(
	code: string,
	cluster = Cluster.AMERICAS,
	key: string | undefined = void 0
): Promise<TournamentCodeDto> {
	return (await (
		await riotFetch(
			new URL(`/lol/tournament/v5/codes/${code}`, getRiotApiBaseUrl(cluster))
				.href,
			void 0,
			key
		)
	).json()) as TournamentCodeDto;
}
