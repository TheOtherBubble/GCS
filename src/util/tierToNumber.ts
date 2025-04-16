import AccountTier from "types/riot/AccountTier";

const tierList = [
	AccountTier.IRON,
	AccountTier.BRONZE,
	AccountTier.SILVER,
	AccountTier.GOLD,
	AccountTier.PLATINUM,
	AccountTier.EMERALD,
	AccountTier.DIAMOND,
	AccountTier.MASTER,
	AccountTier.GRANDMASTER,
	AccountTier.CHALLENGER
];

/**
 * Convert a tier string to a number that represents its order compared to other tiers (lower is worse).
 * @param tier - The tier string.
 * @returns The tier number.
 * @internal
 */
export default function tierToNumber(tier: AccountTier): number {
	return tierList.indexOf(tier);
}
