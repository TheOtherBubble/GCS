import type { playerTable } from "db/schema";

/**
 * Get the URL for a player's page.
 * @param player - The player.
 * @returns The URL for the player's page.
 * @public
 */
export default function getPlayerUrl(
	player: Pick<typeof playerTable.$inferSelect, "displayName" | "name">
): `/players/${typeof player.displayName | typeof player.name}` {
	return `/players/${encodeURIComponent(player.displayName ?? player.name)}`;
}
