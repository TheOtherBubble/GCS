import type ItemRecommendation from "./ItemRecommendation";

/**
 * A block in an item set.
 * @public
 */
export default interface ItemSetBlock {
	/** The type of the block. */
	type: string;

	/** Undocumented value. */
	recMath: boolean;

	/** Undocumented value. */
	recSteps: boolean;

	/** Undocumented value. */
	minSummonerLevel: number;

	/** Undocumented value. */
	maxSummonerLevel: number;

	/** Undocumented value. */
	showIfSummonerSpell: string;

	/** Undocumented value. */
	hideIfSummonerSpell: string;

	/** Undocumented value. */
	appendAfterSection: string;

	/** Undocumented value. */
	visibleWithAllOf: string[];

	/** Undocumented value. */
	hiddenWithAnyOf: string[];

	/** The items in the item set block. */
	items: ItemRecommendation[];
}
