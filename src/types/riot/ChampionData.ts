import type ChampionInfo from "./ChampionInfo";
import type ChampionStats from "./ChampionStats";
import type Sprite from "./Sprite";

/**
 * A champion's data, as it appears in the list of champions.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_champions | Champions}
 * @public
 */
export default interface ChampionData {
	/** The version of Data Dragon. */
	version: string;

	/** The champion's ID. */
	id: string;

	/** The champion's key. */
	key: string;

	/** The champion's name. */
	name: string;

	/** The champion's title. */
	title: string;

	/** The champion's shortened biography. */
	blurb: string;

	/** The champion's statistic rankings. */
	info: ChampionInfo;

	/** The champion's icon image data. */
	image: Sprite;

	/** The champion's classes. */
	tags: string[];

	/** The champion's resource type. */
	partype: string;

	/** The champion's statistics. */
	stats: ChampionStats;
}
