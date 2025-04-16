import MatchFormat from "types/MatchFormat";

/**
 * Get the minimum and maximum number of games for a given format.
 * @param format - The format.
 * @returns The minimum and maximum number of games and the requisite number of wins to be determined the winner for the format, respectively.
 * @public
 */
export default function getFormatGameCount(
	format: MatchFormat
): [number, number, number] {
	switch (format) {
		case MatchFormat.BEST_OF_3:
			return [2, 3, 2];
		case MatchFormat.BEST_OF_5:
			return [3, 5, 3];
		case MatchFormat.BEST_OF_7:
			return [4, 7, 4];
		case MatchFormat.BLOCK_OF_1:
			return [1, 1, 1];
		case MatchFormat.BLOCK_OF_3:
			return [3, 3, 2];
		default:
			return format;
	}
}
