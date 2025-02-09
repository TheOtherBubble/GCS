import type { matchTable, teamGameResultTable } from "db/schema";

/**
 * Get the current score of a match.
 * @param match - The match.
 * @param results - The team game results in the match.
 * @returns The number of wins for the blue and red teams, respectively.
 * @public
 */
export default function getMatchScore(
	match: Pick<typeof matchTable.$inferSelect, "blueTeamId" | "redTeamId">,
	results: Pick<
		typeof teamGameResultTable.$inferSelect,
		"isWinner" | "teamId"
	>[]
): [number, number] {
	let blue = 0;
	let red = 0;
	for (const result of results) {
		if (!result.isWinner) {
			continue;
		}

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
