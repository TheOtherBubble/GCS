import type { platformEnum } from "db/schema";

/**
 * Match metadata.
 * @public
 */
export default interface MetadataDto {
	/** Match data version. */
	dataVersion: `${number}`;

	/** Match ID. */
	matchId: `${(typeof platformEnum.enumValues)[number]}_${number}`;

	/** A list of participant PUUIDs. */
	participants: string[];
}
