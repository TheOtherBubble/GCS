import type GameType from "types/riot/GameType";

/**
 * Get the list of game types.
 * @returns The list of game types.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default async function getGameTypes() {
	const request = await fetch(
		"https://static.developer.riotgames.com/docs/lol/gameTypes.json"
	);
	if (!request.ok) {
		return void 0;
	}

	return (await request.json()) as GameType[];
}
