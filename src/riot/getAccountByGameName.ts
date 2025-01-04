import type AccountDto from "types/riot/AccountDto";
import Cluster from "types/riot/Cluster";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

/**
 * Get the URL of the Riot API endpoint for getting accounts by game name.
 * @param gameName - The game name.
 * @param tagLine - The tag line.
 * @param cluster - The cluster to use to make the request.
 * @returns The URL.
 */
export const getGetAccountByGameNameUrl = (
	gameName: string,
	tagLine: string,
	cluster = Cluster.AMERICAS
) =>
	new URL(
		`/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
		getRiotApiBaseUrl(cluster)
	).href;

/**
 * Get an account in the Riot API.
 * @param gameName - The game name.
 * @param tagLine - The tag line.
 * @param cluster - The cluster to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The account.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getAccountByGameName(
	gameName: string,
	tagLine: string,
	cluster?: Cluster,
	key?: string
) {
	return (await (
		await riotFetch(
			getGetAccountByGameNameUrl(gameName, tagLine, cluster),
			void 0,
			key
		)
	).json()) as AccountDto;
}
