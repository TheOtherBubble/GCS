import type { matchTable, seasonTable } from "db/schema";
import { TIME_SLOT_DURATION } from "./const";

/** The numeric value of Saturday for `Date.prototype.getDay` and `Date.prototype.getUTCDay`. */
const SATURDAY = 6;

/** The numeric value of March for `Date.prototype.getMonth` and `Date.prototype.getUTCMonth`. */
const MARCH = 2;

/** The numeric value of November for `Date.prototype.getMonth` and `Date.prototype.getUTCMonth`. */
const NOVEMBER = 10;

/**
 * Get the date and time that a match should be started based on its round and time slot and its season's start date.
 * @param match - The match.
 * @param season - The match's season.
 * @returns The game start date and time.
 * @public
 */
export default function getMatchDateTime(
	{
		round,
		timeSlot
	}: Pick<typeof matchTable.$inferSelect, "round" | "timeSlot">,
	{ startDate }: Pick<typeof seasonTable.$inferSelect, "startDate">
): Date {
	// Use noon CST (6:00 PM UTC) on the Saturday after the season start date as the base date and time.
	const date = new Date(startDate);
	date.setUTCDate(date.getUTCDate() + (SATURDAY - date.getUTCDay())); // Automatically increments month if necessary.
	date.setUTCHours(18);

	// Round and time slot are one-based in the database.
	const round0 = round - 1;
	const timeSlot0 = timeSlot - 1;

	// The week on which the match was or will be played.
	const week = Math.floor(round0 / 2);

	// Zero if the round is played on a Saturday (even), one if the round is played on a Sunday (odd).
	const sunday = round0 % 2;

	// Go forward one week per even round, plus one day if the round is on a Sunday.
	date.setUTCDate(date.getUTCDate() + week * 7 + sunday);

	// Go forward `TIME_SLOT_DURATION` for Sunday games plus `TIME_SLOT_DURATION` per time slot past the first.
	date.setUTCHours(
		date.getUTCHours() + TIME_SLOT_DURATION * (sunday + timeSlot0)
	);

	// If the game is between March 9 and November 2 (inclusive), move it back one hour to account for daylight savings time in the United States and Canada.
	const month = date.getUTCMonth();
	const day = date.getUTCDate();
	if (
		(month === MARCH && day >= 9) ||
		(month > MARCH && month < NOVEMBER) ||
		(month === NOVEMBER && day <= 2)
	) {
		date.setUTCHours(date.getUTCHours() - 1);
	}

	return date;
}
