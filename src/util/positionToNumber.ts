import Position from "types/riot/Position";

const positionList = [
	Position.TOP,
	Position.JUNGLE,
	Position.MIDDLE,
	Position.BOTTOM,
	Position.UTILITY
];

/**
 * Convert a position string to a number that represents its standard order (top, jungle, middle, bottom, support).
 * @param position - The position string.
 * @returns The position number.
 * @internal
 */
export default function positionToNumber(position: Position): number {
	return positionList.indexOf(position);
}
