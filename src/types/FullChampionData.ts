import type ChampionData from "types/ChampionData";
import type ChampionSkin from "types/ChampionSkin";
import type ItemSet from "types/ItemSet";
import type PassiveAbility from "types/PassiveAbility";
import type Spell from "types/Spell";

/**
 * A champion's data.
 * @see {@link https://developer.riotgames.com/docs/lol#data-dragon_champions | Champions}
 * @public
 */
export default interface FullChampionData
	extends Omit<ChampionData, "version"> {
	/** The champion's skins. */
	skins: ChampionSkin[];

	/** The champion's biography. */
	lore: string;

	/** Loading screen tips that can appear when this champion is on your team. */
	allytips: string[];

	/** Loading screen tips that can appear when this champion is on the enemy team. */
	enemytips: string[];

	/** The champion's spells. */
	spells: Spell[];

	/** The champion's passive ability. */
	passive: PassiveAbility;

	/** The champion's recommended item sets. */
	recommended: ItemSet[];
}
