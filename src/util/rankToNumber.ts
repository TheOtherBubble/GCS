import type { AccountRank } from "types/db/AccountRank";

const rankList = ["IV", "III", "II", "I"];

/**
 * Convert a rank string to a number that represents its order compared to other ranks (lower is worse).
 * @param rank - The rank string.
 * @returns The rank number.
 * @internal
 */
export default function rankToNumber(rank: AccountRank) {
	return rankList.indexOf(rank);
}
