import type { seasonTable } from "db/schema";

/**
 * Get the URL for a season's page.
 * @param season - The season.
 * @returns The URL for the season's page.
 * @public
 */
export default function getSeasonUrl({
	slug
}: Pick<typeof seasonTable.$inferSelect, "slug">): `/seasons/${string}` {
	return `/seasons/${encodeURIComponent(slug)}`;
}
