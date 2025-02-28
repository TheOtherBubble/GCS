import type { playerGameResultTable } from "db/schema";
import positionToNumber from "./positionToNumber";

/**
 * Sort player game results based on the standard position order.
 * @param a - The first player game result.
 * @param b - The second player game result.
 * @returns A negative number if the position of `a` is earlier than that of `b`, zero if the positions of `a` and `b` are equal, or a positive number if the position of `a` is later than that of `b`.
 * @public
 */
export default function sortPlayersStandard(
	{ position: a }: Pick<typeof playerGameResultTable.$inferSelect, "position">,
	{ position: b }: Pick<typeof playerGameResultTable.$inferSelect, "position">
): number {
	return positionToNumber(a) - positionToNumber(b);
}
