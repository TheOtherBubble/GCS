import type { matchTable } from "db/schema";

/**
 * Get the URL for a match's page.
 * @param match - The match.
 * @returns The URL for the match's page.
 * @public
 */
export default function getMatchUrl({
	id
}: Pick<typeof matchTable.$inferSelect, "id">): `/matches/${typeof id}` {
	return `/matches/${id.toString() as `${typeof id}`}`;
}
