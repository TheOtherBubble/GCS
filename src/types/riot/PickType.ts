/**
 * Pick types of a tournament game.
 * @public
 */
enum PickType {
	/** Blind pick. */
	BLIND_PICK = "BLIND_PICK",

	/** Draft pick. */
	DRAFT_MODE = "DRAFT_MODE",

	/** All random. */
	ALL_RANDOM = "ALL_RANDOM",

	/** Tournament draft pick. */
	TOURNAMENT_DRAFT = "TOURNAMENT_DRAFT"
}

export default PickType;
