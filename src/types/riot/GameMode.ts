/**
 * A game mode.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default interface GameMode {
	/** The game mode's ID. */
	gameMode: string;

	/** The description of the game mode. */
	description: string;
}
