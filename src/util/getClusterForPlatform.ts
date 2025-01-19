import Cluster from "types/riot/Cluster";
import type { Platform } from "types/db/Platform";

/**
 * Get the regional routing value for a platform.
 * @param platform - The platform.
 * @returns The regional routing value, or `undefined` if the regional routing value is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
export default function getClusterForPlatform(platform: Platform) {
	switch (platform) {
		case "NA1":
		case "BR1":
		case "LA1":
		case "LA2":
			return Cluster.AMERICAS;
		case "KR":
		case "JP1":
			return Cluster.ASIA;
		case "EUN1":
		case "EUW1":
		case "TR1":
		case "RU":
			return Cluster.EUROPE;
		case "OC1":
		case "SG2":
		case "TW2":
		case "VN2":
			return Cluster.SEA;
		default:
			return void 0;
	}
}
