import type { gameTable } from "db/schema";

/**
 * Get the URL for a game's page.
 * @param game - The game.
 * @returns The URL for the game's page.
 * @public
 */
export default function getGameUrl({
	id
}: Pick<typeof gameTable.$inferSelect, "id">): `/games/${typeof id}` {
	return `/games/${id.toString() as `${typeof id}`}`;
}
