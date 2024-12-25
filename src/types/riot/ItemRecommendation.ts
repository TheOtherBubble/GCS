/**
 * An item recommendation.
 * @public
 */
export default interface ItemRecommendation {
	/** The ID of the recommended item. */
	id: string;

	/** The number of items that are recommended to be bought. */
	count: number;

	/** Whether or not the item count is hidden. */
	hideCount: boolean;
}
