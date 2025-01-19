import Cluster from "types/riot/Cluster";
import getMatchDtoByGameId from "./getMatchDtoByGameId";
import getPlatformForRegion from "./getPlatformForRegion";
import getTournamentGames from "riot/getTournamentGames";

/**
 * Get a match from the Riot ID with a tournament code.
 * @param code - The tournament code.
 * @param platform - The platform ID.
 * @param key - The Riot API key to use.
 * @returns The match.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getMatchDtoByTournamentCode(
	id: string,
	cluster = Cluster.AMERICAS,
	key: string | undefined = void 0
) {
	const [game] = await getTournamentGames(id, cluster, key);
	if (!game) {
		return void 0;
	}

	return await getMatchDtoByGameId(
		game.gameId,
		getPlatformForRegion(game.region),
		key
	);
}
