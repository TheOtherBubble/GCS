import type Region from "types/riot/Region";
import type { accountTable } from "db/schema";
import getPlatformForRegion from "./getPlatformForRegion";

/**
 * Make a U.GG link for the given set of accounts.
 * @param accounts - The accounts to include in the U.GG link.
 * @return A U.GG link.
 * @public
 */
export default function ugg(
	...accounts: (typeof accountTable.$inferSelect)[]
): string {
	const [account] = accounts;
	if (!account) {
		return "https://u.gg/";
	}

	const platform = getPlatformForRegion(account.region as Region);
	if (accounts.length <= 1) {
		return `https://u.gg/lol/profile/${platform}/${encodeURIComponent(account.gameNameCache)}-${encodeURIComponent(account.tagLineCache)}`;
	}

	return `https://u.gg/multisearch?summoners=${accounts.map(({ gameNameCache, tagLineCache }) => `${encodeURIComponent(gameNameCache)}-${encodeURIComponent(tagLineCache)}`).join(",")}&region=${platform.toLowerCase()}`;
}
