import type { playerTable } from "db/schema";

/**
 * Get the URL for a player's page.
 * @param player - The player.
 * @returns The URL for the player's page.
 * @public
 */
export default function getPlayerUrl({
	displayName,
	name
}: Pick<
	typeof playerTable.$inferSelect,
	"displayName" | "name"
>): `/players/${typeof displayName | typeof name}` {
	return `/players/${encodeURIComponent(displayName ?? name)}`;
}
