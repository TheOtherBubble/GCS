/**
 * Information about a branch of a rune page in a match.
 * @public
 */
export default interface PerkStyleSelectionDto {
	/** The keystone. */
	perk: number;

	/** The first row minor rune. */
	var1: number;

	/** The second row minor rune. */
	var2: number;

	/** The third row minor rune. */
	var3: number;
}
