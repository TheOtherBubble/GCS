import type { playerTable } from "db/schema";

/**
 * Get the URL of the given player.
 * @param player - The player.
 * @returns The URL.
 * @public
 */
export default function getPlayerUrl(player: typeof playerTable.$inferSelect) {
	return `/players/${player.displayName ? encodeURIComponent(player.displayName) : player.name ? encodeURIComponent(player.name) : encodeURIComponent(player.id)}`;
}
