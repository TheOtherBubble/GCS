import type { positionEnum } from "db/schema";

const positionList = [
	"TOP",
	"JUNGLE",
	"MIDDLE",
	"BOTTOM",
	"UTILITY"
] satisfies (typeof positionEnum.enumValues)[number][];

/**
 * Convert a position string to a number that represents its standard order (top, jungle, middle, bottom, support).
 * @param position - The position string.
 * @return The position number.
 * @internal
 */
export default function positionToNumber(
	rank: (typeof positionEnum.enumValues)[number]
): number {
	return positionList.indexOf(rank);
}
