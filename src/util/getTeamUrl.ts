import type { teamTable } from "db/schema";

/**
 * Get the URL for a team's page.
 * @param team - The team.
 * @return The URL for the team's page.
 * @public
 */
export default function getTeamUrl(
	team: Pick<typeof teamTable.$inferSelect, "vanityUrlSlug">
): `/teams/${string}` {
	return `/teams/${encodeURIComponent(team.vanityUrlSlug)}`;
}
