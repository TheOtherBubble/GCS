import type Cluster from "types/riot/Cluster";
import type { platformEnum } from "db/schema";

/**
 * The base URL of Riot API endpoints.
 * @param cluster - The regional or platform routing value to use when executing the request.
 * @returns The base URL.
 */
export default function getRiotApiBaseUrl(
	cluster: Cluster | (typeof platformEnum.enumValues)[number]
): `https://${Cluster | (typeof platformEnum.enumValues)[number]}.api.riotgames.com/` {
	return `https://${cluster}.api.riotgames.com/`;
}
