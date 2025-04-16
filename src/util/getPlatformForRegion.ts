import Platform from "types/riot/Platform";
import Region from "types/riot/Region";

/**
 * Get the platform routing value for a region.
 * @param region - The region.
 * @returns The platform routing value, or `undefined` if the platform is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
export default function getPlatformForRegion(region: Region): Platform {
	switch (region) {
		case Region.NORTH_AMERICA:
			return Platform.NA1;
		case Region.BRAZIL:
			return Platform.BR1;
		case Region.LATIN_AMERICA_NORTH:
			return Platform.LA1;
		case Region.LATIN_AMERICA_SOUTH:
			return Platform.LA2;
		case Region.KOREA:
			return Platform.KR;
		case Region.JAPAN:
			return Platform.JP1;
		case Region.EUROPE_NORDIC_AND_EAST:
			return Platform.EUN1;
		case Region.EUROPE_WEST:
			return Platform.EUW1;
		case Region.MIDDLE_EAST:
			return Platform.ME1;
		case Region.TURKEY:
			return Platform.TR1;
		case Region.RUSSIA:
			return Platform.RU;
		case Region.OCEANIA:
			return Platform.OC1;
		case Region.PHILIPPINES:
			return Platform.PH2;
		case Region.SINGAPORE:
			return Platform.SG2;
		case Region.THAILAND:
			return Platform.TH2;
		case Region.TAIWAN:
			return Platform.TW2;
		case Region.VIETNAM:
			return Platform.VN2;
		case Region.PUBLIC_BETA_ENVIRONMENT:
			return Platform.PBE;
		default:
			return region;
	}
}
