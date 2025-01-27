import type { matchFormatEnum } from "db/schema";

/**
 * Get the minimum and maximum number of games for a given format.
 * @param format - The format.
 * @return The minimum and maximum number of games and the requisite number of wins to be determined the winner for the format, respectively.
 * @public
 */
export default function getFormatGameCount(
	format: (typeof matchFormatEnum.enumValues)[number]
): [number, number, number] {
	switch (format) {
		case "Best of 3":
			return [2, 3, 2];
		case "Best of 5":
			return [3, 5, 3];
		case "Best of 7":
			return [4, 7, 4];
		case "Block of 1":
			return [1, 1, 1];
		case "Block of 3":
			return [3, 3, 2];
		default:
			return format;
	}
}
