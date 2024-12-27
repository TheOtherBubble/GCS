import Cluster from "types/riot/Cluster";

/**
 * The base URL of Riot API endpoints.
 * @param cluster - The cluster to use when executing the request.
 * @returns The base URL.
 */
export default function getRiotApiBaseUrl(cluster = Cluster.AMERICAS) {
	return `https://${cluster}.api.riotgames.com/`;
}
