import type Sprite from "./Sprite";

/**
 * A champion's passive ability.
 * @public
 */
export default interface PassiveAbility {
	/** The ability's name. */
	name: string;

	/** The ability's description. */
	description: string;

	/** The ability's sprite/icon. */
	image: Sprite;
}
