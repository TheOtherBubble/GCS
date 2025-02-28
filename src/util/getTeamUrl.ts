import type { teamTable } from "db/schema";

/**
 * Get the URL for a team's page.
 * @param team - The team.
 * @returns The URL for the team's page.
 * @public
 */
export default function getTeamUrl({
	slug
}: Pick<typeof teamTable.$inferSelect, "slug">): `/teams/${string}` {
	return `/teams/${encodeURIComponent(slug)}`;
}
