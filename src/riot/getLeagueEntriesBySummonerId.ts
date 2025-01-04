import type LeagueEntryDto from "types/riot/LeagueEntryDto";
import type { Platform } from "types/db/Platform";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

/**
 * Get the URL of the Riot API endpoint for getting league entries by summoner ID.
 * @param id - The summoner ID.
 * @param platform - The platform to use to make the request.
 * @returns The URL.
 */
export const getGetLeagueEntriesBySummonerIdUrl = (
	id: string,
	platform: Platform = "NA1"
) =>
	new URL(
		`/lol/league/v4/entries/by-summoner/${id}`,
		getRiotApiBaseUrl(platform)
	).href;

/**
 * Get a league entry in the Riot API.
 * @param id - The summoner ID.
 * @param platform - The platform to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The league entry.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getLeagueEntriesBySummonerId(
	id: string,
	platform?: Platform,
	key?: string
) {
	return (await (
		await riotFetch(
			getGetLeagueEntriesBySummonerIdUrl(id, platform),
			void 0,
			key
		)
	).json()) as LeagueEntryDto[];
}
