/**
 * Information relating to a mini series.
 * @public
 */
export default interface MiniSeriesDto {
	/** Losses. */
	losses: number;

	/** Progress. */
	progress: string;

	/** Target. */
	target: number;

	/** Wins. */
	wins: number;
}
