import { gameTable, matchTable } from "./schema";
import type Cluster from "types/riot/Cluster";
import type TournamentCodeParameters from "types/riot/TournamentCodeParameters";
import db from "./db";
import makeTournamentCodes from "riot/makeTournamentCodes";

/**
 * Create matches.
 * @param matches - The matches.
 * @param params - The parameters to use to generate tournament codes.
 * @param cluster - The cluster to execute the request to make tournament codes against.
 * @param key - The Riot API key, or `undefined` to pull one from the environment variables.
 * @returns When finished.
 */
export default async function createMatches(
	matches: (typeof matchTable.$inferInsert)[],
	params?: TournamentCodeParameters,
	cluster?: Cluster,
	key?: string
) {
	// Create the matches.
	const createdMatches = await db
		.insert(matchTable)
		.values(matches)
		.returning();

	// Create the first game in each match.
	const tournamentCodes = await makeTournamentCodes(
		params,
		createdMatches.length,
		createdMatches[0]?.seasonId,
		cluster,
		key
	);
	const games = [];
	for (const match of createdMatches) {
		const tournamentCode = tournamentCodes.pop();
		if (!tournamentCode) {
			throw new Error("Not enough tournament codes!");
		}

		games.push({ matchId: match.id, tournamentCode });
	}

	// Store the games in the database.
	return await db.insert(gameTable).values(games);
}
