import Cluster from "types/riot/Cluster";
import type TournamentGames from "types/riot/TournamentGames";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import riotFetch from "./riotFetch";

/**
 * Get a tournament code's games in the Riot API.
 * @param code - The tournament code.
 * @param platform - The platform to use to make the request.
 * @param key - The Riot API key to use.
 * @return The tournament code's games.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function getTournamentGames(
	code: string,
	cluster = Cluster.AMERICAS,
	key: string | undefined = void 0
): Promise<TournamentGames[]> {
	return (await (
		await riotFetch(
			new URL(
				`/lol/tournament/v5/games/by-code/${code}`,
				getRiotApiBaseUrl(cluster)
			).href,
			void 0,
			key
		)
	).json()) as TournamentGames[];
}
