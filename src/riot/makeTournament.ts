import Cluster from "types/riot/Cluster";
import type TournamentRegistrationParameters from "types/riot/TournamentRegistrationParameters";
import getRiotApiBaseUrl from "./getRiotApiBaseUrl";
import getTournamentProvider from "db/getTournamentProvider";
import riotFetch from "./riotFetch";

/**
 * Get the URL of the Riot API endpoint for making tournaments.
 * @param cluster - The cluster to use to make the request.
 * @returns The URL.
 */
export const getMakeTournamentUrl = (cluster = Cluster.AMERICAS) =>
	new URL("/lol/tournament-stub/v5/tournaments", getRiotApiBaseUrl(cluster))
		.href;

/**
 * Make a tournament in the Riot API.
 * @param params - The tournament registration parameters or the name of the tournament.
 * @param cluster - The cluster to use to make the request.
 * @param key - The Riot API key to use.
 * @returns The tournament ID.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 * @public
 */
export default async function makeTournament(
	params?: TournamentRegistrationParameters | string,
	cluster?: Cluster,
	key?: string
) {
	return (await (
		await riotFetch(
			getMakeTournamentUrl(cluster),
			{
				body: JSON.stringify(
					params
						? typeof params === "string"
							? { name: params, providerId: await getTournamentProvider() }
							: params
						: { providerId: await getTournamentProvider() }
				),
				method: "POST"
			},
			key
		)
	).json()) as number;
}
