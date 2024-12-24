/**
 * A tooltip that displays when leveling up a spell.
 * @public
 */
export default interface LevelTooltip {
	/** The label of the tooltip. */
	label: string[];

	/** A string template of the content of the tooltip. */
	effect: string[];
}
