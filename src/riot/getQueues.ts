import type Queue from "types/riot/Queue";

/**
 * Get the list of queues.
 * @returns The list of queues.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default async function getQueues() {
	const request = await fetch(
		"https://static.developer.riotgames.com/docs/lol/queues.json"
	);
	if (!request.ok) {
		return void 0;
	}

	return (await request.json()) as Queue[];
}
