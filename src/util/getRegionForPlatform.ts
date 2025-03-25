import Region from "types/riot/Region";
import type { platformEnum } from "db/schema";

/**
 * Get the region for a platform routing value.
 * @param platform - The platform.
 * @returns The region, or `undefined` if the region is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
export default function getRegionForPlatform(
	platform: (typeof platformEnum.enumValues)[number]
): Region {
	switch (platform) {
		case "NA1":
			return Region.NORTH_AMERICA;
		case "BR1":
			return Region.BRAZIL;
		case "LA1":
			return Region.LATIN_AMERICA_NORTH;
		case "LA2":
			return Region.LATIN_AMERICA_SOUTH;
		case "KR":
			return Region.KOREA;
		case "JP1":
			return Region.JAPAN;
		case "EUN1":
			return Region.EUROPE_NORDIC_AND_EAST;
		case "EUW1":
			return Region.EUROPE_WEST;
		case "ME1":
			return Region.MIDDLE_EAST;
		case "TR1":
			return Region.TURKEY;
		case "RU":
			return Region.RUSSIA;
		case "OC1":
			return Region.OCEANIA;
		case "PH2":
			return Region.PHILIPPINES;
		case "SG2":
			return Region.SINGAPORE;
		case "TH2":
			return Region.THAILAND;
		case "TW2":
			return Region.TAIWAN;
		case "VN2":
			return Region.VIETNAM;
		case "PBE":
			return Region.PUBLIC_BETA_ENVIRONMENT;
		default:
			return platform;
	}
}
