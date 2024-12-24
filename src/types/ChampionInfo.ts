/**
 * A champion's statistic rankings.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_champions | Champions}
 * @public
 */
export default interface ChampionInfo {
	/** The champion's attack rating. */
	attack: number;

	/** The champion's defense rating. */
	defense: number;

	/** The champion's magic rating. */
	magic: number;

	/** The champion's difficulty rating. */
	difficulty: number;
}
