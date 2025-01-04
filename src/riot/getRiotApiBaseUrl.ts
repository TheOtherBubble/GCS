import type Cluster from "types/riot/Cluster";
import type { Platform } from "types/db/Platform";

/**
 * The base URL of Riot API endpoints.
 * @param cluster - The cluster or platform to use when executing the request.
 * @returns The base URL.
 */
export default function getRiotApiBaseUrl(cluster: Cluster | Platform) {
	return `https://${cluster}.api.riotgames.com/`;
}
