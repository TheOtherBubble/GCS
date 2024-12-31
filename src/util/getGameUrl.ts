import type { gameTable } from "db/schema";

/**
 * Get the URL of the given game.
 * @param game - The game.
 * @returns The URL.
 * @public
 */
export default function getGameUrl(game: typeof gameTable.$inferSelect) {
	return `/games/${game.id.toString()}`;
}
