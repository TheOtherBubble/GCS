import Image, { type ImageProps } from "components/Image";
import AccountTier from "types/riot/AccountTier";
import type { JSX } from "react";
import bronze from "./assets/bronze.png";
import challenger from "./assets/challenger.png";
import diamond from "./assets/diamond.png";
import emerald from "./assets/emerald.png";
import gold from "./assets/gold.png";
import grandmaster from "./assets/grandmaster.png";
import iron from "./assets/iron.png";
import master from "./assets/master.png";
import platinum from "./assets/platinum.png";
import silver from "./assets/silver.png";

// The newest ranked emblem assets can be downloaded from https://static.developer.riotgames.com/docs/lol/ranked-emblems-latest.zip.

/**
 * Properties that can be passed to a `RankedEmblem`.
 * @public
 */
export type RankedEmblemProps = Omit<
	ImageProps,
	"src" | "alt" | "width" | "height" | "children"
> & {
	/** The ranked tier to be represented by the emblem image. */
	tier: AccountTier;
};

/**
 * An image of the ranked emblem that corresponds to the given tier.
 * @param tier - The tier.
 * @returns The ranked emblem, or `undefined` if unranked.
 * @public
 */
export default function RankedEmblem(props: RankedEmblemProps): JSX.Element {
	switch (props.tier) {
		case AccountTier.IRON:
			return <Image alt="Iron" src={iron} {...props} />;
		case AccountTier.BRONZE:
			return <Image alt="Bronze" src={bronze} {...props} />;
		case AccountTier.SILVER:
			return <Image alt="Silver" src={silver} {...props} />;
		case AccountTier.GOLD:
			return <Image alt="Gold" src={gold} {...props} />;
		case AccountTier.PLATINUM:
			return <Image alt="Platinum" src={platinum} {...props} />;
		case AccountTier.EMERALD:
			return <Image alt="Emerald" src={emerald} {...props} />;
		case AccountTier.DIAMOND:
			return <Image alt="Diamond" src={diamond} {...props} />;
		case AccountTier.MASTER:
			return <Image alt="Master" src={master} {...props} />;
		case AccountTier.GRANDMASTER:
			return <Image alt="Grandmaster" src={grandmaster} {...props} />;
		case AccountTier.CHALLENGER:
			return <Image alt="Challenger" src={challenger} {...props} />;
		default:
			return props.tier;
	}
}
