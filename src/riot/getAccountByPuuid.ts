import type AccountDto from "types/riot/AccountDto";
import Cluster from "types/riot/Cluster";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

/**
 * Get the URL of the Riot API endpoint for getting accounts by PUUID.
 * @param puuid - The PUUID.
 * @param cluster - The cluster to use to make the request.
 * @returns The URL.
 */
export const getGetAccountByPuuidUrl = (
	puuid: string,
	cluster = Cluster.AMERICAS
) =>
	new URL(
		`/riot/account/v1/accounts/by-puuid/${puuid}`,
		getRiotApiBaseUrl(cluster)
	).href;

/**
 * Get an account in the Riot API.
 * @param puuid - The PUUID.
 * @param cluster - The cluster to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The account.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getAccountByPuuid(
	puuid: string,
	cluster?: Cluster,
	key?: string
) {
	return (await (
		await riotFetch(getGetAccountByPuuidUrl(puuid, cluster), void 0, key)
	).json()) as AccountDto;
}
