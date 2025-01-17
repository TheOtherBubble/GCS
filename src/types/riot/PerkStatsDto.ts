/**
 * Information about the raw stats section of a rune page in a match.
 * @public
 */
export default interface PerkStatsDto {
	/** The defensive stat. */
	defense: number;

	/** The flexible stat. */
	flex: number;

	/** The offensive stat. */
	offense: number;
}
