import type { Player } from "types/db/Player";

/**
 * Get the URL of a player from a slug.
 * @param slug - The slug.
 * @returns The URL.
 * @public
 */
export const getPlayerUrlBySlug = (slug: string) => `/players/${slug}`;

/**
 * Get the URL of the given player.
 * @param player - The player.
 * @returns The URL.
 * @public
 */
export default function getPlayerUrl(player: Player) {
	return getPlayerUrlBySlug(
		player.displayName
			? encodeURIComponent(player.displayName)
			: player.name
				? encodeURIComponent(player.name)
				: encodeURIComponent(player.id)
	);
}
