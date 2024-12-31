import type { Team } from "types/db/Team";

/**
 * Get the URL of a team from an encoded vanity URL slug.
 * @param slug - The encoded vanity URL slug.
 * @returns The URL.
 * @public
 */
export const getTeamUrlByEncodedSlug = (slug: string) => `/teams/${slug}`;

/**
 * Get the URL of a team from a decoded vanity URL slug.
 * @param slug - The decoded vanity URL slug.
 * @returns The URL.
 * @public
 */
export const getTeamUrlByDecodedSlug = (slug: string) =>
	getTeamUrlByEncodedSlug(encodeURIComponent(slug));

/**
 * Get the URL of the given team.
 * @param team - The team.
 * @returns The URL.
 * @public
 */
export default function getTeamUrl(team: Team) {
	return getTeamUrlByDecodedSlug(team.vanityUrlSlug);
}
