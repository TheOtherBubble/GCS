/**
 * A champion's statistics.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_champions | Champions}
 * @public
 */
export default interface ChampionStats {
	/** The champion's health points. */
	hp: number;

	/** The amount of health points that the champion gains per level. */
	hpperlevel: number;

	/** The champion's mana points. */
	mp: number;

	/** The amount of mana points that the champion gains per level. */
	mpperlevel: number;

	/** The champion's movement speed. */
	movespeed: number;

	/** The champion's armor. */
	armor: number;

	/** The amount of armor that the champion gains per level. */
	armorperlevel: number;

	/** The champion's magic resistance. */
	spellblock: number;

	/** The amount of magic resistance that the champion gains per level. */
	spellblockperlevel: number;

	/** The champion's attack range. */
	attackrange: number;

	/** The champion's health regeneration per five ticks. */
	hpregen: number;

	/** The amount of health regeneration per five ticks that the champion gains per level. */
	hpregenperlevel: number;

	/** The champion's mana regeneration per five ticks. */
	mpregen: number;

	/** The amount of mana regeneration per five ticks that the champion gains per level. */
	mpregenperlevel: number;

	/** The champion's critical strike chance. */
	crit: number;

	/** The amount of critical strike chance that the champion gains per level. */
	critperlevel: number;

	/** The champion's attack damage. */
	attackdamage: number;

	/** The amount of attack damage that the champion gains per level. */
	attackdamageperlevel: number;

	/** The amount of attack speed that the champion gains per level. */
	attackspeedperlevel: number;

	/** The champion's attack speed. */
	attackspeed: number;
}
