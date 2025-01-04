/**
 * Queue types.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_ranked-info | Ranked Info}
 * @public
 */
enum QueueType {
	/** Ranked solo/duo 5v5. */
	SOLO = "RANKED_SOLO_5x5",

	/** Ranked flex 5v5. */
	FLEX = "RANKED_TEAM_5x5"
}

export default QueueType;
