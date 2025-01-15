import type { Match } from "types/db/Match";
import type { TeamGameResult } from "types/db/TeamGameResult";
import getFormatGameCount from "./getFormatGameCount";

/**
 * Get the current score of a match.
 * @param match - The match.
 * @param results - The team game results in the match.
 * @returns The number of wins for the blue and red teams, respectively.
 * @public
 */
export default function getMatchScore(
	match: Match,
	results: TeamGameResult[]
): [number, number] {
	// If there's a winner override, return a sweep.
	if (match.winner) {
		const [min] = getFormatGameCount(match.format);
		return match.winner === "Blue" ? [min, 0] : [0, min];
	}

	// Otherwise, determine the match score from the game results.
	let blue = 0;
	let red = 0;
	for (const result of results) {
		switch (result.teamId) {
			case match.blueTeamId:
				blue++;
				continue;
			case match.redTeamId:
				red++;
				continue;
			default:
		}
	}

	return [blue, red];
}
