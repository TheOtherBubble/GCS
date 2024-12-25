import type { seasonsTable } from "./schema";

/**
 * Get the URL of the given season.
 * @param season - The season or the season's decoded vanity URL slug.
 * @returns The URL.
 * @public
 */
export default function getSeasonUrl(
	season: typeof seasonsTable.$inferSelect | string
) {
	return `/seasons/${encodeURIComponent(typeof season === "string" ? season : season.vanityUrlSlug)}`;
}
