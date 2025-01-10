/**
 * Get the URL of the given game.
 * @param slug - The game's stringified ID.
 * @returns The URL.
 * @public
 */
export default function getGameUrl(slug: `${number}`) {
	return `/games/${slug}`;
}
