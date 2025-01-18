import type GameMode from "types/riot/GameMode";

/**
 * Get the list of game modes.
 * @returns The list of game modes.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default async function getGameModes() {
	const request = await fetch(
		"https://static.developer.riotgames.com/docs/lol/gameModes.json"
	);
	if (!request.ok) {
		return void 0;
	}

	return (await request.json()) as GameMode[];
}
