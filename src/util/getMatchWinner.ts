import type { matchTable, teamGameResultTable } from "db/schema";
import getFormatGameCount from "./getFormatGameCount";
import getMatchScore from "./getMatchScore";

/**
 * Get the team that won a match.
 * @param match - The match.
 * @param results - The team game results in the match.
 * @returns The ID of the team that won the match, or `undefined` if no team has won the match.
 * @public
 */
export default function getMatchWinner<
	T extends Pick<
		typeof matchTable.$inferSelect,
		"format" | "blueTeamId" | "redTeamId"
	>
>(
	match: T,
	results: Pick<
		typeof teamGameResultTable.$inferSelect,
		"isWinner" | "teamId"
	>[]
): T["blueTeamId"] | T["redTeamId"] | undefined {
	const [, , toWin] = getFormatGameCount(match.format);
	const [blue, red] = getMatchScore(match, results);

	if (blue >= toWin) {
		return match.blueTeamId;
	}

	if (red >= toWin) {
		return match.redTeamId;
	}

	return void 0;
}
