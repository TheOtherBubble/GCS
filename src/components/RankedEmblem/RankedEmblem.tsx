import Image, { type ImageProps } from "../Image/Image";
import type { JSX } from "react";
import type { accountTier } from "../../scripts/schema";
import bronze from "./bronze.png";
import challenger from "./challenger.png";
import diamond from "./diamond.png";
import emerald from "./emerald.png";
import gold from "./gold.png";
import grandmaster from "./grandmaster.png";
import iron from "./iron.png";
import master from "./master.png";
import platinum from "./platinum.png";
import silver from "./silver.png";

// The newest ranked emblem assets can be downloaded from https://static.developer.riotgames.com/docs/lol/ranked-emblems-latest.zip.

/**
 * Properties that can be passed to a `RankedEmblem`.
 * @public
 */
export type RankedEmblemProps = Omit<
	ImageProps,
	"src" | "alt" | "width" | "height"
> & {
	tier: (typeof accountTier.enumValues)[number];
};

/**
 * An image of the ranked emblem that corresponds to the given tier.
 * @param tier - The tier.
 * @returns The ranked emblem.
 * @public
 */
export default function RankedEmblem(props: RankedEmblemProps): JSX.Element {
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
		default: // Prevented by TypeScript.
			return <Image alt="Challenger" src={challenger} {...props} />;
	}
}
