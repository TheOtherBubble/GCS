import type { accountTable } from "db/schema";
import sortAccountsByRank from "./sortAccountsByRank";

/**
 * Return the highest-ranked account from the given list of accounts.
 * @param accounts - The accounts to order.
 * @returns The highest-ranked account.
 * @public
 */
export default function getHighestRankedAccount<
	T extends Pick<typeof accountTable.$inferSelect, "tier" | "rank">
>(accounts: T[]): T | undefined {
	return accounts.sort(sortAccountsByRank).reverse()[0];
}
