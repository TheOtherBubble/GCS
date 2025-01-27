import Cluster from "types/riot/Cluster";
import type { platformEnum } from "db/schema";

/**
 * Get the regional routing value for a platform.
 * @param platform - The platform.
 * @return The regional routing value, or `undefined` if the regional routing value is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
export default function getClusterForPlatform(
	platform: (typeof platformEnum.enumValues)[number]
): Cluster {
	switch (platform) {
		case "BR1":
		case "LA1":
		case "LA2":
		case "NA1":
		case "PBE": // Just use Americas cluster for PBE.
			return Cluster.AMERICAS;
		case "EUN1":
		case "EUW1":
		case "ME1":
		case "RU":
		case "TR1":
			return Cluster.EUROPE;
		case "JP1":
		case "KR":
			return Cluster.ASIA;
		case "OC1":
		case "PH2":
		case "SG2":
		case "TH2":
		case "TW2":
		case "VN2":
			return Cluster.SEA;
		default:
			return platform;
	}
}
