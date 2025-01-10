import type { AccountTier } from "types/db/AccountTier";

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
 * @returns The tier number.
 * @internal
 */
export default function tierToNumber(tier: AccountTier) {
	return tierList.indexOf(tier);
}
