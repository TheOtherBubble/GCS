import Cluster from "types/riot/Cluster";
import Platform from "types/riot/Platform";

/**
 * Get the regional routing value for a platform.
 * @param platform - The platform.
 * @returns The regional routing value, or `undefined` if the regional routing value is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
export default function getClusterForPlatform(platform: Platform): Cluster {
	switch (platform) {
		case Platform.BR1:
		case Platform.LA1:
		case Platform.LA2:
		case Platform.NA1:
		case Platform.PBE: // Just use Americas cluster for PBE.
			return Cluster.AMERICAS;
		case Platform.EUN1:
		case Platform.EUW1:
		case Platform.ME1:
		case Platform.RU:
		case Platform.TR1:
			return Cluster.EUROPE;
		case Platform.JP1:
		case Platform.KR:
			return Cluster.ASIA;
		case Platform.OC1:
		case Platform.PH2:
		case Platform.SG2:
		case Platform.TH2:
		case Platform.TW2:
		case Platform.VN2:
			return Cluster.SEA;
		default:
			return platform;
	}
}
