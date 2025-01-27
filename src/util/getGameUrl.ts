import type { gameTable } from "db/schema";

/**
 * Get the URL for a game's page.
 * @param game - The game.
 * @return The URL for the game's page.
 * @public
 */
export default function getGameUrl(
	game: Pick<typeof gameTable.$inferSelect, "id">
): `/games/${typeof game.id}` {
	return `/games/${game.id.toString() as `${number}`}`;
}
