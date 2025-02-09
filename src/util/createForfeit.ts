import type {
	gameResultTable,
	matchTable,
	seasonTable,
	teamGameResultTable
} from "db/schema";
import getMatchDateTime from "./getMatchDateTime";

/**
 * Create game result and team game result data representing a forfeit for the given match.
 * @param match - The match.
 * @param season - The season that the match is part of.
 * @param blueWon - Whether or not the match's blue team won the game.
 * @returns The game result and team game results.
 * @public
 */
export default function createForfeit(
	match: Pick<
		typeof matchTable.$inferSelect,
		"round" | "timeSlot" | "blueTeamId" | "redTeamId"
	>,
	season: Pick<typeof seasonTable.$inferSelect, "startDate">,
	blueWon: boolean
): [
	typeof gameResultTable.$inferInsert,
	[
		typeof teamGameResultTable.$inferInsert,
		typeof teamGameResultTable.$inferInsert
	]
] {
	const now = Date.now();
	const id = -now;

	return [
		{
			duration: 0,
			id,
			mapId: 11,
			mode: "CLASSIC",
			platformId: "NA1",
			queueId: 0,
			startTimestamp: getMatchDateTime(match, season).valueOf(),
			tournamentCode: `FF-${now.toString(16)}`,
			type: "CUSTOM_GAME",
			version: "0.0.0.0"
		},
		[
			{
				gameResultId: id,
				isWinner: blueWon,
				riotId: 100,
				teamId: match.blueTeamId
			},
			{
				gameResultId: id,
				isWinner: !blueWon,
				riotId: 200,
				teamId: match.redTeamId
			}
		]
	];
}
