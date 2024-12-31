import type { Match } from "types/db/Match";

/**
 * Get the URL of the given match.
 * @param match - The match.
 * @returns The URL.
 * @public
 */
export default function getMatchUrl(match: Match) {
	return `/matches/${match.id.toString()}`;
}
