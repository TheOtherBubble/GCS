import type { matchTable } from "db/schema";

/**
 * Get the URL of the given match.
 * @param match - The match.
 * @returns The URL.
 * @public
 */
export default function getMatchUrl(match: typeof matchTable.$inferSelect) {
	return `/matches/${match.id.toString()}`;
}
