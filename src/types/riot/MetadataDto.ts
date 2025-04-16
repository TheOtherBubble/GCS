import type Platform from "./Platform";

/**
 * Match metadata.
 * @public
 */
export default interface MetadataDto {
	/** Match data version. */
	dataVersion: `${number}`;

	/** Match ID. */
	matchId: `${Platform}_${number}`;

	/** A list of participant PUUIDs. */
	participants: string[];
}
