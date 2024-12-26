import type {
	accountRankEnum,
	accountTierEnum,
	accountsTable
} from "db/schema";

/**
 * Convert a tier string to a number that represents its order compared to other tiers (lower is worse).
 * @param tier - The tier string.
 * @returns The tier number.
 * @internal
 */
const tierToNumber = (tier: (typeof accountTierEnum.enumValues)[number]) =>
	[
		"IRON",
		"BRONZE",
		"SILVER",
		"GOLD",
		"PLATINUM",
		"DIAMOND",
		"MASTER",
		"GRANDMASTER",
		"CHALLENGER"
	].indexOf(tier);

/**
 * Convert a rank string to a number that represents its order compared to other ranks (lower is worse).
 * @param tier - The rank string.
 * @returns The rank number.
 * @internal
 */
const rankToNumber = (tier: (typeof accountRankEnum.enumValues)[number]) =>
	["IV", "III", "II", "I"].indexOf(tier);

/**
 * Return the highest-ranked account from the given list of accounts.
 * @param accounts - The accounts to order.
 * @returns The highest-ranked account.
 * @public
 */
export default function getHighestRankedAccount(
	accounts: (typeof accountsTable.$inferSelect)[]
) {
	return accounts.sort(
		(a, b) =>
			tierToNumber(b.tierCache) - tierToNumber(a.tierCache) ||
			rankToNumber(b.rankCache) - rankToNumber(a.rankCache)
	)[0];
}
