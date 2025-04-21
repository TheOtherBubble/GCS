import type { accountTable } from "db/schema";

/**
 * Make a U.GG link for the given set of accounts.
 * @param accounts - The accounts to include in the U.GG link.
 * @returns A U.GG link.
 * @public
 */
export default function ugg(
	...accounts: Pick<
		typeof accountTable.$inferSelect,
		"name" | "tagLine" | "region"
	>[]
): string {
	const [account] = accounts;
	if (!account) {
		return "https://u.gg/";
	}

	if (accounts.length <= 1) {
		return `https://u.gg/lol/profile/${account.region}/${encodeURIComponent(account.name)}-${encodeURIComponent(account.tagLine)}`;
	}

	return `https://u.gg/lol/multisearch?summoners=${accounts.map(({ name, tagLine }) => `${encodeURIComponent(name)}-${encodeURIComponent(tagLine)}`).join(",")}&region=${account.region.toLowerCase()}`;
}
