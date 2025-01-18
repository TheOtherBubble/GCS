/**
 * A game type.
 * @see {@link https://developer.riotgames.com/docs/lol#working-with-lol-apis_game-constants | Game Constants}
 * @public
 */
export default interface GameType {
	/** The game type's ID. */
	gametype: string;

	/** The description of the game type. */
	description: string;
}
