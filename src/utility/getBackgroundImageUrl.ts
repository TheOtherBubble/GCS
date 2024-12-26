import type { playerTable } from "db/schema";

/**
 * Get the URL of the image of the player's selected background skin.
 * @param player - The player.
 * @returns The URL.
 * @public
 */
export default function getBackgroundImageUrl(
	player: typeof playerTable.$inferSelect
) {
	return player.backgroundChampionId &&
		typeof player.backgroundSkinNumber === "number"
		? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.backgroundChampionId}_${player.backgroundSkinNumber.toString()}.jpg`
		: void 0;
}
