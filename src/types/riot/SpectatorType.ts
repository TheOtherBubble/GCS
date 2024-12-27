/**
 * Spectator types of a tournament game.
 * @public
 */
enum SpectatorType {
	/** Nobody may spectate the game. */
	NONE = "NONE",

	/** Only the spectators who joined the lobby may spectate the game. */
	LOBBYONLY = "LOBBYONLY",

	/** Anybody may spectate the game. */
	ALL = "ALL"
}

export default SpectatorType;
