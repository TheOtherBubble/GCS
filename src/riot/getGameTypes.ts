import type GameType from "types/riot/GameType";

/**
 * Get the list of game types.
 * @return The list of game types.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default async function getGameTypes(): Promise<GameType[]> {
	const request = await fetch(
		"https://static.developer.riotgames.com/docs/lol/gameTypes.json"
	);
	if (!request.ok) {
		return [];
	}

	return (await request.json()) as GameType[];
}
