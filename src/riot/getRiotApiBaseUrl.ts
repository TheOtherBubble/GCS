import type Cluster from "types/riot/Cluster";
import type Platform from "types/riot/Platform";

/**
 * The base URL of Riot API endpoints.
 * @param cluster - The regional or platform routing value to use when executing the request.
 * @returns The base URL.
 */
export default function getRiotApiBaseUrl(
	cluster: Cluster | Platform
): `https://${Cluster | Platform}.api.riotgames.com/` {
	return `https://${cluster}.api.riotgames.com/`;
}
