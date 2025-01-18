/**
 * A queue.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default interface Queue {
	/** The queue's ID. */
	queueId: number;

	/** The name of the queue's map. */
	map: string;

	/** A description of the queue. */
	description: string | null;

	/** Notes about the queue. */
	notes: string | null;
}
