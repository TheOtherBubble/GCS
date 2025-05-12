import type { playerTable } from "db/schema";

/**
 * Get the URL for a player's page.
 * @param player - The player.
 * @returns The URL for the player's page.
 * @public
 */
export default function getPlayerUrl({
	slug,
	id
}: Pick<
	typeof playerTable.$inferSelect,
	"slug" | "id"
>): `/players/${typeof slug | typeof id}` {
	return `/players/${encodeURIComponent(slug ?? id)}`;
}
