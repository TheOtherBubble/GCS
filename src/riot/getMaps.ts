import type Map from "types/riot/Map";

/**
 * Get the list of maps.
 * @returns The list of maps.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default async function getMaps(): Promise<Map[]> {
	const request = await fetch(
		"https://static.developer.riotgames.com/docs/lol/maps.json"
	);
	if (!request.ok) {
		return [];
	}

	return (await request.json()) as Map[];
}
