import type { Player } from "types/db/Player";
import getPlayerUrlBySlug from "./getPlayerUrlBySlug";

/**
 * Get the URL of the given player.
 * @param player - The player.
 * @returns The URL.
 * @public
 */
export default function getPlayerUrl(player: Player) {
	return getPlayerUrlBySlug(
		encodeURIComponent(player.displayName ?? player.name)
	);
}
