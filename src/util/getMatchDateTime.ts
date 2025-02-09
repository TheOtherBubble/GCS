import type { matchTable, seasonTable } from "db/schema";
import { TIME_SLOT_DURATION } from "./const";

/** The numeric value of Saturday for `Date.prototype.getDay` and `Date.prototype.getUTCDay`. */
const SATURDAY = 6;

/**
 * Get the date and time that a match should be started based on its round and time slot and its season's start date.
 * @param match - The match.
 * @param season - The match's season.
 * @returns The game start date and time.
 * @public
 */
export default function getMatchDateTime(
	match: Pick<typeof matchTable.$inferSelect, "round" | "timeSlot">,
	season: Pick<typeof seasonTable.$inferSelect, "startDate">
): Date {
	// Use noon CST (6:00 PM UTC) on the Saturday after the season start date as the base date and time.
	const date = new Date(season.startDate);
	date.setUTCDate(date.getUTCDate() + (SATURDAY - date.getUTCDay())); // Automatically increments month if necessary.
	date.setUTCHours(18);

	// Round and time slot are one-based in the database.
	const round = match.round - 1;
	const timeSlot = match.timeSlot - 1;

	// The week on which the match was or will be played.
	const week = Math.floor(round / 2);

	// Zero if the round is played on a Saturday (even), one if the round is played on a Sunday (odd).
	const sunday = round % 2;

	// Go forward one week per even round, plus one day if the round is on a Sunday.
	date.setUTCDate(date.getUTCDate() + week * 7 + sunday);

	// Go forward `TIME_SLOT_DURATION` for Sunday games plus `TIME_SLOT_DURATION` per time slot past the first.
	date.setUTCHours(
		date.getUTCHours() + TIME_SLOT_DURATION * (sunday + timeSlot)
	);

	return date;
}
