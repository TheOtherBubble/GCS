import type MapType from "./MapType";
import type PickType from "./PickType";
import type Region from "./Region";
import type SpectatorType from "./SpectatorType";

/**
 * Details about a tournament code.
 * @public
 */
export default interface TournamentCodeDto {
	/** The tournament code. */
	code: string;

	/** The spectator mode for the tournament code's game. */
	spectators: SpectatorType;

	/** The name of the lobby for the tournament code's game. */
	lobbyName: string;

	/** The metadata associated with the tournament code. */
	metaData: string;

	/** The password of the lobby for the tournament code's game. */
	password: string;

	/** The maximum number of players allowed on each team in the tournament code's game. */
	teamSize: number;

	/** The ID of the tournament code's provider. */
	providerId: number;

	/** The pick mode for the tournament code's game. */
	pickType: PickType;

	/** The ID of the tournament code's tournament. */
	tournamentId: number;

	/** The ID of the tournament code. */
	id: number;

	/** The tournament code's region. */
	region: Region;

	/** The game map for the tournament code's game. */
	map: MapType;

	/** The encrypted PUUIDs of the participants in the tournament code's game. */
	participants: string[];
}
