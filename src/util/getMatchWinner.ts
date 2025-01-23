import type { Match } from "types/db/Match";
import type { TeamGameResult } from "types/db/TeamGameResult";
import getFormatGameCount from "./getFormatGameCount";
import getMatchScore from "./getMatchScore";

/**
 * Get the team that won a match.
 * @param match - The match.
 * @param results - The team game results in the match.
 * @returns The team that won the match.
 * @public
 */
export default function getMatchWinner(
	match: Match,
	results: TeamGameResult[]
) {
	const [, , toWin] = getFormatGameCount(match.format);
	const [blue, red] = getMatchScore(match, results);

	if (blue >= toWin) {
		return "Blue";
	}

	if (red >= toWin) {
		return "Red";
	}

	return void 0;
}
