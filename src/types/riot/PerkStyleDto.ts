import type PerkStyleSelectionDto from "./PerkStyleSelectionDto";

/**
 * Information about the runes section of a rune page in a match.
 * @public
 */
export default interface PerkStyleDto {
	/** A description of the rune page. */
	description: string;

	/** The parts of the rune page. */
	selections: PerkStyleSelectionDto[];

	/** An undocumented value. */
	style: number;
}
