import type SummonerDto from "types/riot/SummonerDto";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import type { platformEnum } from "db/schema";
import riotFetch from "./riotFetch";

/**
 * Get a summoner in the Riot API.
 * @param puuid - The PUUID.
 * @param platform - The platform to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The summoner.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getSummonerByPuuid(
	puuid: string,
	platform: (typeof platformEnum.enumValues)[number] = "NA1",
	key: string | undefined = void 0
): Promise<SummonerDto> {
	return (await (
		await riotFetch(
			new URL(
				`/lol/summoner/v4/summoners/by-puuid/${puuid}`,
				getRiotApiBaseUrl(platform)
			).href,
			void 0,
			key
		)
	).json()) as SummonerDto;
}
