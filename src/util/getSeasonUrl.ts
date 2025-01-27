import type { seasonTable } from "db/schema";

/**
 * Get the URL for a season's page.
 * @param season - The season.
 * @return The URL for the season's page.
 * @public
 */
export default function getSeasonUrl(
	season: Pick<typeof seasonTable.$inferSelect, "vanityUrlSlug">
): `/seasons/${string}` {
	return `/seasons/${encodeURIComponent(season.vanityUrlSlug)}`;
}
