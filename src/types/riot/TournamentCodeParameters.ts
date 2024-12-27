import type MapType from "./MapType";
import type PickType from "./PickType";
import type SpectatorType from "./SpectatorType";

/**
 * Parameters for creating a Riot Games tournament code.
 * @public
 */
export default interface TournamentCodeParameters {
	/** The PUUIDs of players that are allowed to participate in the game. */
	allowedParticipants?: string[];

	/** Used to denote custom information about the game. */
	metadata?: string;

	/** The number of players per team. */
	teamSize: 1 | 2 | 3 | 4 | 5;

	/** The pick type of the game. */
	pickType: PickType;

	/** The map type of the game. */
	mapType: MapType;

	/** The spectator type of the game. */
	spectatorType: SpectatorType;

	/** Whether or not a check should be done to ensure that there are enough allowed participants to make full teams. */
	enoughPlayers: boolean;
}
