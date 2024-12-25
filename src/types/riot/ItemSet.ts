import type ItemSetBlock from "./ItemSetBlock";

/**
 * A champion's recommended item set.
 * @public
 */
export default interface ItemSet {
	/** The champion's ID. */
	champion: string;

	/** The title of the item set. */
	title: string;

	/** The map that the item set is recommended on. */
	map: string;

	/** An indicator for whether the item set was made by Riot or a player. */
	type: string;

	/** A custom tag for the item set. */
	customTag: string;

	/** The order of the item set in the displayed item sets. */
	sortrank: number;

	/** Undocumented value. */
	extensionPage: boolean;

	/** Undocumented value. */
	customPanel: unknown;

	/** The blocks in the item set. */
	blocks: ItemSetBlock[];
}
