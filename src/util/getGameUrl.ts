import type { Game } from "types/db/Game";

/**
 * Get the URL of a game from a slug.
 * @param slug - The slug.
 * @returns The URL.
 * @public
 */
export const getGameUrlBySlug = (slug: string) => `/games/${slug}`;

/**
 * Get the URL of the given game.
 * @param game - The game.
 * @returns The URL.
 * @public
 */
export default function getGameUrl(game: Game) {
	return getGameUrlBySlug(game.id.toString());
}
