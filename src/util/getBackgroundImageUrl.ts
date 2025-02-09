import type { playerTable } from "db/schema";

/**
 * Get the URL of the image of the player's selected background skin.
 * @param player - The player.
 * @returns The URL, or `undefined` if the player hasn't selected a background skin.
 * @public
 */
export default function getBackgroundImageUrl(
	player: Pick<
		typeof playerTable.$inferSelect,
		"backgroundChampionId" | "backgroundSkinNumber"
	>
):
	| `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${string}_${string}.jpg`
	| undefined {
	return player.backgroundChampionId &&
		typeof player.backgroundSkinNumber === "number"
		? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.backgroundChampionId}_${player.backgroundSkinNumber.toString()}.jpg`
		: void 0;
}
