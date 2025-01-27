import type AccountDto from "types/riot/AccountDto";
import Cluster from "types/riot/Cluster";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

/**
 * Get an account in the Riot API.
 * @param puuid - The PUUID.
 * @param cluster - The cluster to use to make the request.
 * @param key - The Riot API key to use.
 * @return The account.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getAccountByPuuid(
	puuid: string,
	cluster = Cluster.AMERICAS,
	key: string | undefined = void 0
): Promise<AccountDto> {
	return (await (
		await riotFetch(
			new URL(
				`/riot/account/v1/accounts/by-puuid/${puuid}`,
				getRiotApiBaseUrl(cluster)
			).href,
			void 0,
			key
		)
	).json()) as AccountDto;
}
