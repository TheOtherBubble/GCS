import { gameTable, matchTable } from "./schema";
import type Cluster from "types/riot/Cluster";
import type { InsertMatch } from "types/db/Match";
import type TournamentCodeParameters from "types/riot/TournamentCodeParameters";
import db from "./db";
import makeTournamentCodes from "riot/makeTournamentCodes";

/**
 * Create matches.
 * @param matches - The matches.
 * @param codes - The tournament codes to use for the first games in the matches, or `undefined` to generate the correct number of codes.
 * @param params - The parameters to use to generate tournament codes.
 * @param cluster - The cluster to execute the request to make tournament codes against.
 * @param key - The Riot API key, or `undefined` to pull one from the environment variables.
 * @returns When finished.
 * @throws `Error` if the response has a bad status or if the Riot API key is missing.
 */
export default async function createMatches(
	matches: InsertMatch[],
	codes?: [],
	params?: TournamentCodeParameters,
	cluster?: Cluster,
	key?: string
) {
	// Ensure that tournament codes are accessible before creating anything.
	const tournamentCodes =
		codes ??
		(await makeTournamentCodes(
			params,
			matches.length,
			matches[0]?.seasonId,
			cluster,
			key
		));
	if (tournamentCodes.length < matches.length) {
		throw new Error("Not enough tournament codes!");
	}

	// Create the matches.
	const createdMatches = await db
		.insert(matchTable)
		.values(matches)
		.returning();

	// Build the games.
	const games = [];
	for (const match of createdMatches) {
		const tournamentCode = tournamentCodes.pop();
		if (!tournamentCode) {
			throw new Error("Not enough tournament codes!");
		}

		games.push({ matchId: match.id, tournamentCode });
	}

	// Create the games.
	return await db.insert(gameTable).values(games);
}
