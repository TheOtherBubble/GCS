import type DataDragonTemplateVariable from "types/DataDragonTemplateVariable";
import type LevelTooltip from "types/LevelTooltip";
import type Sprite from "types/Sprite";

/**
 * Information about a champion's spell.
 * @public
 */
export default interface Spell {
	/** The spell's ID. */
	id: string;

	/** The spell's name. */
	name: string;

	/** The spell's description. */
	description: string;

	/** The spell's tooltip. */
	tooltip: string;

	/** A tooltip that displays when leveling up the spell. */
	leveltip: LevelTooltip;

	/** The number of skill points that can be put into the spell. */
	maxrank: number;

	/** The spell's cooldown at each rank. */
	cooldown: number[];

	/** A string version of the spell's cooldown. */
	cooldownBurn: string;

	/** The spell's resource cost at each rank. */
	cost: number[];

	/** A string version of the spell's resource cost. */
	costBurn: string;

	/** An unused value. Apparently some new system that Riot has been migrating to, but has been empty for years. */
	datavalues: object;

	/** The spell's effects. */
	effect: [null, ...number[][]];

	/** String versions of the spell's effects. */
	effectBurn: [null, ...string[]];

	/** Template variables that replace content in string templates. */
	vars: DataDragonTemplateVariable[];

	/** A string template representation of the type of resource that is used to cast the spell. */
	costType: string;

	/** The maximum number of charges that the spell can store at a time. */
	maxammo: string;

	/** The spell's maximum cast range at each rank. */
	range: number[];

	/** A string version of the spell's maximum cast range. */
	rangeBurn: string;

	/** The spell's sprite/icon. */
	image: Sprite;

	/** A string template representation of the resource cost of the spell. */
	resource: string;
}
