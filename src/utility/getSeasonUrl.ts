import type { seasonTable } from "db/schema";

/**
 * Get the URL of a season from an encoded vanity URL slug.
 * @param slug - The encoded vanity URL slug.
 * @returns The URL.
 * @public
 */
export const getSeasonUrlByEncodedSlug = (slug: string) => `/seasons/${slug}`;

/**
 * Get the URL of a season from a decoded vanity URL slug.
 * @param slug - The decoded vanity URL slug.
 * @returns The URL.
 * @public
 */
export const getSeasonUrlByDecodedSlug = (slug: string) =>
	getSeasonUrlByEncodedSlug(encodeURIComponent(slug));

/**
 * Get the URL of the given season.
 * @param season - The season.
 * @returns The URL.
 * @public
 */
export default function getSeasonUrl(season: typeof seasonTable.$inferSelect) {
	return getSeasonUrlByDecodedSlug(season.vanityUrlSlug);
}
