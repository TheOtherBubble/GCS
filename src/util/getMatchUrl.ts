import type { Match } from "types/db/Match";

/**
 * Get the URL of a match from a slug.
 * @param slug - The slug.
 * @returns The URL.
 * @public
 */
export const getMatchUrlBySlug = (slug: string) => `/matches/${slug}`;

/**
 * Get the URL of the given match.
 * @param match - The match.
 * @returns The URL.
 * @public
 */
export default function getMatchUrl(match: Match) {
	return getMatchUrlBySlug(match.id.toString());
}
