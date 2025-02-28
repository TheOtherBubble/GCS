import type { accountTable } from "db/schema";
import rankToNumber from "./rankToNumber";
import tierToNumber from "./tierToNumber";

/**
 * Sort two accounts by rank.
 * @param a - The first account.
 * @param b - The second account.
 * @returns A negative number if the tier and rank of `a` is lower than those of `b`, zero if the tiers and ranks of `a` and `b` are equal, or a positive number if the tier and rank of `a` is higher than those of `b`.
 * @public
 */
export default function sortAccountsByRank(
	a: Pick<typeof accountTable.$inferSelect, "tier" | "rank">,
	b: Pick<typeof accountTable.$inferSelect, "tier" | "rank">
): number {
	return (
		tierToNumber(a.tier) - tierToNumber(b.tier) ||
		rankToNumber(a.rank) - rankToNumber(b.rank)
	);
}
