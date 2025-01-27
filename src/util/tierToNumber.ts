import type { accountTierEnum } from "db/schema";

const tierList = [
	"IRON",
	"BRONZE",
	"SILVER",
	"GOLD",
	"PLATINUM",
	"DIAMOND",
	"MASTER",
	"GRANDMASTER",
	"CHALLENGER"
];

/**
 * Convert a tier string to a number that represents its order compared to other tiers (lower is worse).
 * @param tier - The tier string.
 * @return The tier number.
 * @internal
 */
export default function tierToNumber(
	tier: (typeof accountTierEnum.enumValues)[number]
): number {
	return tierList.indexOf(tier);
}
