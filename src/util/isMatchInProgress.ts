import type { matchTable, seasonTable } from "db/schema";
import { TIME_SLOT_DURATION } from "./const";
import getMatchDateTime from "./getMatchDateTime";

/**
 * Determine whether the given match is currently in-progress.
 * @param match - The match.
 * @param season - The match's season.
 * @returns Whether or not the match is currently in progress.
 * @public
 */
export default function isMatchInProgress(
	match: Pick<typeof matchTable.$inferSelect, "round" | "timeSlot">,
	season: Pick<typeof seasonTable.$inferSelect, "startDate">
): boolean {
	const start = getMatchDateTime(match, season).valueOf();
	const now = Date.now();
	return start <= now && start + TIME_SLOT_DURATION * 1000 * 60 * 60 >= now;
}
