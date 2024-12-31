import type { Game } from "types/db/Game";

/**
 * Get the URL of the given game.
 * @param game - The game.
 * @returns The URL.
 * @public
 */
export default function getGameUrl(game: Game) {
	return `/games/${game.id.toString()}`;
}
