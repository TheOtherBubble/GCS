import type { matchesTable } from "db/schema";

/**
 * Get the URL of the given match.
 * @param match - The match.
 * @returns The URL.
 * @public
 */
export default function getMatchUrl(match: typeof matchesTable.$inferSelect) {
	return `/matches/${match.id.toString()}`;
}
