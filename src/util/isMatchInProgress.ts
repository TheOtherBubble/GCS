import type { Match } from "types/db/Match";
import type { Season } from "types/db/Season";
import { TIME_SLOT_DURATION } from "./const";
import getMatchDateTime from "./getMatchDateTime";

/**
 * Determine whether the given match is currently in-progress.
 * @param match - The match.
 * @param season - The season that the match is part of.
 * @returns Whether or not the match is currently in progress.
 * @public
 */
export default function isMatchInProgress(match: Match, season: Season) {
	const start = getMatchDateTime(match, season).valueOf();
	const now = Date.now();
	return start <= now && start + TIME_SLOT_DURATION * 1000 * 60 * 60 >= now;
}
