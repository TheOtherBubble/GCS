import Platform from "types/riot/Platform";
import Region from "types/riot/Region";

/**
 * Get the region for a platform routing value.
 * @param platform - The platform.
 * @returns The region, or `undefined` if the region is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
export default function getRegionForPlatform(platform: Platform): Region {
	switch (platform) {
		case Platform.NA1:
			return Region.NORTH_AMERICA;
		case Platform.BR1:
			return Region.BRAZIL;
		case Platform.LA1:
			return Region.LATIN_AMERICA_NORTH;
		case Platform.LA2:
			return Region.LATIN_AMERICA_SOUTH;
		case Platform.KR:
			return Region.KOREA;
		case Platform.JP1:
			return Region.JAPAN;
		case Platform.EUN1:
			return Region.EUROPE_NORDIC_AND_EAST;
		case Platform.EUW1:
			return Region.EUROPE_WEST;
		case Platform.ME1:
			return Region.MIDDLE_EAST;
		case Platform.TR1:
			return Region.TURKEY;
		case Platform.RU:
			return Region.RUSSIA;
		case Platform.OC1:
			return Region.OCEANIA;
		case Platform.PH2:
			return Region.PHILIPPINES;
		case Platform.SG2:
			return Region.SINGAPORE;
		case Platform.TH2:
			return Region.THAILAND;
		case Platform.TW2:
			return Region.TAIWAN;
		case Platform.VN2:
			return Region.VIETNAM;
		case Platform.PBE:
			return Region.PUBLIC_BETA_ENVIRONMENT;
		default:
			return platform;
	}
}
