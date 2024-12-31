import Image, { type ImageProps } from "components/Image";
import type { AccountTier } from "types/db/AccountTier";
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
	"src" | "alt" | "width" | "height"
> & {
	/** The ranked tier to be represented by the emblem image. */
	tier: AccountTier;
};

/**
 * An image of the ranked emblem that corresponds to the given tier.
 * @param tier - The tier.
 * @returns The ranked emblem.
 * @public
 */
export default function RankedEmblem(props: RankedEmblemProps) {
	switch (props.tier) {
		case "IRON":
			return <Image alt="Iron" src={iron} {...props} />;
		case "BRONZE":
			return <Image alt="Bronze" src={bronze} {...props} />;
		case "SILVER":
			return <Image alt="Silver" src={silver} {...props} />;
		case "GOLD":
			return <Image alt="Gold" src={gold} {...props} />;
		case "PLATINUM":
			return <Image alt="Platinum" src={platinum} {...props} />;
		case "EMERALD":
			return <Image alt="Emerald" src={emerald} {...props} />;
		case "DIAMOND":
			return <Image alt="Diamond" src={diamond} {...props} />;
		case "MASTER":
			return <Image alt="Master" src={master} {...props} />;
		case "GRANDMASTER":
			return <Image alt="Grandmaster" src={grandmaster} {...props} />;
		case "CHALLENGER":
			return <Image alt="Challenger" src={challenger} {...props} />;
		default: // Unranked.
			return void 0;
	}
}
