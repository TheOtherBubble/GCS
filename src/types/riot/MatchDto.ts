import type InfoDto from "./InfoDto";
import type MetadataDto from "./MetadataDto";

/**
 * Information about a match.
 * @public
 */
export default interface MatchDto {
	/** Match metadata. */
	metadata: MetadataDto;

	/** Match information. */
	info: InfoDto;
}
