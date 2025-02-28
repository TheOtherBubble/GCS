import type { playerGameResultTable } from "db/schema";

/**
 * Get a player's average kills plus assists per death ("KDA ratio" or "KDA").
 * @param games - The player game results to consider in the average.
 * @returns The player's KDA ratio.
 * @public
 */
export default function getAverageKda(
	...games: Pick<
		typeof playerGameResultTable.$inferSelect,
		"kills" | "deaths" | "assists"
	>[]
): number {
	let k = 0;
	let d = 0;
	let a = 0;
	for (const { kills, deaths, assists } of games) {
		k += kills;
		d += deaths;
		a += assists;
	}

	return (k + a) / d; // JavaScript automatically returns `Infinity` for divisions by zero.
}
