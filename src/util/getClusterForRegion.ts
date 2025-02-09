import Cluster from "types/riot/Cluster";
import Region from "types/riot/Region";

/**
 * Get the regional routing value for a region.
 * @param region - The region.
 * @returns The regional routing value, or `undefined` if the regional routing value is unknown.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_regional-routing-values | Regional Routing Values}
 * @public
 */
export default function getClusterForRegion(region: Region): Cluster {
	switch (region) {
		case Region.NORTH_AMERICA:
		case Region.BRAZIL:
		case Region.LATIN_AMERICA_NORTH:
		case Region.LATIN_AMERICA_SOUTH:
		case Region.PUBLIC_BETA_ENVIRONMENT: // Just use Americas cluster for PBE.
			return Cluster.AMERICAS;
		case Region.KOREA:
		case Region.JAPAN:
			return Cluster.ASIA;
		case Region.EUROPE_NORDIC_AND_EAST:
		case Region.EUROPE_WEST:
		case Region.MIDDLE_EAST:
		case Region.TURKEY:
		case Region.RUSSIA:
			return Cluster.EUROPE;
		case Region.OCEANIA:
		case Region.PHILIPPINES:
		case Region.SINGAPORE:
		case Region.THAILAND:
		case Region.TAIWAN:
		case Region.VIETNAM:
			return Cluster.SEA;
		default:
			return region;
	}
}
