import Region from "types/riot/Region";
import type { platformEnum } from "db/schema";

/**
 * Get the platform routing value for a region.
 * @param region - The region.
 * @returns The platform routing value, or `undefined` if the platform is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
export default function getPlatformForRegion(
	region: Region
): (typeof platformEnum.enumValues)[number] {
	switch (region) {
		case Region.NORTH_AMERICA:
			return "NA1";
		case Region.BRAZIL:
			return "BR1";
		case Region.LATIN_AMERICA_NORTH:
			return "LA1";
		case Region.LATIN_AMERICA_SOUTH:
			return "LA2";
		case Region.KOREA:
			return "KR";
		case Region.JAPAN:
			return "JP1";
		case Region.EUROPE_NORDIC_AND_EAST:
			return "EUN1";
		case Region.EUROPE_WEST:
			return "EUW1";
		case Region.MIDDLE_EAST:
			return "ME1";
		case Region.TURKEY:
			return "TR1";
		case Region.RUSSIA:
			return "RU";
		case Region.OCEANIA:
			return "OC1";
		case Region.PHILIPPINES:
			return "PH2";
		case Region.SINGAPORE:
			return "SG2";
		case Region.THAILAND:
			return "TH2";
		case Region.TAIWAN:
			return "TW2";
		case Region.VIETNAM:
			return "VN2";
		case Region.PUBLIC_BETA_ENVIRONMENT:
			return "PBE";
		default:
			return region;
	}
}
