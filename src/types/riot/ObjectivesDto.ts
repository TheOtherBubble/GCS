import type ObjectiveDto from "./ObjectiveDto";

/**
 * Information about all classes of objectives in a match.
 * @public
 */
export default interface ObjectivesDto {
	/** Information about Baron Nashor. */
	baron: ObjectiveDto;

	/** Information about champions. */
	champion: ObjectiveDto;

	/** Information about dragons. */
	dragon: ObjectiveDto;

	/** Information about Void Grubs. */
	horde: ObjectiveDto;

	/** Information about inhibitors. */
	inhibitor: ObjectiveDto;

	/** Information about the Rift Herald. */
	riftHerald: ObjectiveDto;

	/** Information about towers. */
	tower: ObjectiveDto;
}
