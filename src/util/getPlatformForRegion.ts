import type { Platform } from "types/db/Platform";
import Region from "types/riot/Region";

/**
 * Get the platform ID for a region.
 * @param region - The region.
 * @returns The platform ID, or `undefined` if the platform is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
export default function getPlatformForRegion(
	region: Region
): Platform | undefined {
	switch (region) {
		case Region.BRAZIL:
			return "BR1";
		case Region.EUROPE_NORDIC_AND_EAST:
			return "EUN1";
		case Region.EUROPE_WEST:
			return "EUW1";
		case Region.JAPAN:
			return "JP1";
		case Region.KOREA:
			return "KR";
		case Region.LATIN_AMERICA_NORTH:
			return "LA1";
		case Region.LATIN_AMERICA_SOUTH:
			return "LA2";
		case Region.NORTH_AMERICA:
			return "NA1";
		case Region.OCEANIA:
			return "OC1";
		case Region.RUSSIA:
			return "RU";
		case Region.TURKEY:
			return "TR1";
		default:
			return void 0;
	}
}
