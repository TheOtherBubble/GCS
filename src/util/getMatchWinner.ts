import type { Match } from "types/db/Match";
import type { MatchTeam } from "types/db/MatchTeam";
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
		return "Blue" satisfies MatchTeam;
	}

	if (red >= toWin) {
		return "Red" satisfies MatchTeam;
	}

	return void 0;
}
