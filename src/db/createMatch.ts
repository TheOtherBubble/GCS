import { gameTable, matchTable } from "./schema";
import type TournamentCodeParameters from "types/riot/TournamentCodeParameters";
import db from "./db";
import makeTournamentCodes from "riot/makeTournamentCodes";

/**
 * Create a match.
 * @param match - The match.
 * @param code - The tournament code to use for the first game in the match, or `undefined` to generate one.
 * @param params - The parameters to use if a tournament code needs to be generated.
 * @returns When finished.
 */
export default async function createMatch(
	match: typeof matchTable.$inferInsert,
	code?: string,
	params?: TournamentCodeParameters
) {
	// Create the match.
	await db.insert(matchTable).values(match);

	// Create the first game in the match.
	const tournamentCode = code ?? (await makeTournamentCodes(params))[0]; // TODO
	if (!tournamentCode) {
		throw new Error("Failed to create a tournament code.");
	}

	return await db.insert(gameTable).values({ tournamentCode });
}
