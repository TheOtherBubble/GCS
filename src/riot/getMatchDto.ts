import Cluster from "types/riot/Cluster";
import type MatchDto from "types/riot/MatchDto";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

/**
 * Get a match in the Riot API.
 * @param id - The match's ID.
 * @param platform - The platform to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The match.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getMatchDto(
	id: string,
	cluster = Cluster.AMERICAS,
	key: string | undefined = void 0
): Promise<MatchDto> {
	return (await (
		await riotFetch(
			new URL(`/lol/match/v5/matches/${id}`, getRiotApiBaseUrl(cluster)).href,
			void 0,
			key
		)
	).json()) as MatchDto;
}
