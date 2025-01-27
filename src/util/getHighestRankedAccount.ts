import type { accountTable } from "db/schema";
import rankToNumber from "./rankToNumber";
import tierToNumber from "./tierToNumber";

/**
 * Return the highest-ranked account from the given list of accounts.
 * @param accounts - The accounts to order.
 * @return The highest-ranked account.
 * @public
 */
export default function getHighestRankedAccount<
	T extends Pick<typeof accountTable.$inferSelect, "tierCache" | "rankCache">[]
>(...accounts: T): T[number] extends never ? undefined : T[number] {
	return accounts.sort(
		(a, b) =>
			tierToNumber(b.tierCache) - tierToNumber(a.tierCache) ||
			rankToNumber(b.rankCache) - rankToNumber(a.rankCache)
	)[0] as T[number] extends never ? undefined : T[number];
}
