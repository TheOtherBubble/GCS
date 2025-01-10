import type { Account } from "types/db/Account";
import rankToNumber from "./rankToNumber";
import tierToNumber from "./tierToNumber";

/**
 * Return the highest-ranked account from the given list of accounts.
 * @param accounts - The accounts to order.
 * @returns The highest-ranked account.
 * @public
 */
export default function getHighestRankedAccount(...accounts: Account[]) {
	return accounts.sort(
		(a, b) =>
			tierToNumber(b.tierCache) - tierToNumber(a.tierCache) ||
			rankToNumber(b.rankCache) - rankToNumber(a.rankCache)
	)[0];
}
