/**
 * A champion's skin.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_champions | Champions}
 * @public
 */
export default interface ChampionSkin {
	/** The skin's ID. */
	id: string;

	/** The skin's number. */
	num: number;

	/** The skin's name. */
	name: string;

	/** Whether or not the skin has chromas. */
	chromas: boolean;
}
