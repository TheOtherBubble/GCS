import type { Match } from "types/db/Match";
import type { Season } from "types/db/Season";
import { TIME_SLOT_DURATION } from "./const";

/** The numeric value of Saturday for `Date.prototype.getDay` and `Date.prototype.getUTCDay`. */
const SATURDAY = 6;

/**
 * Get the date and time that a match should be played based on its round and the season start date.
 * @param match - The match.
 * @param season - The season that the game belongs to.
 * @returns The game start date and time.
 * @public
 */
export default function getMatchDateTime(match: Match, season: Season) {
	// Use noon CST (6:00 PM UTC) on the Saturday after the season start date as the base date and time.
	const date = new Date(season.startDate);
	date.setUTCDate(date.getUTCDate() + (SATURDAY - date.getUTCDay())); // Automatically increments month if necessary.
	date.setUTCHours(18);

	// Rounds and time slots are one-based in the database.
	const round = match.round - 1;
	const timeSlot = match.timeSlot - 1;

	// The week that the match takes place in.
	const week = Math.floor(round / 2);

	// Zero if the round is played on a Saturday (even), one if the round is played on a Sunday (odd).
	const sun = round % 2;

	// Go forward one week per even round, plus one day if the round is on a Sunday.
	date.setUTCDate(date.getUTCDate() + week * 7 + sun);

	// Go forward two hours for Sunday games.
	date.setUTCHours(date.getUTCHours() + 2 * sun);

	// Go forward `TIME_SLOT_DURATION` per time slot.
	date.setUTCHours(date.getUTCHours() + TIME_SLOT_DURATION * timeSlot);

	return date;
}
