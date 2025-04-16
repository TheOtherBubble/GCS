import AccountRank from "types/riot/AccountRank";

const rankList = [
	AccountRank.IV,
	AccountRank.III,
	AccountRank.II,
	AccountRank.I
];

/**
 * Convert a rank string to a number that represents its order compared to other ranks (lower is worse).
 * @param rank - The rank string.
 * @returns The rank number.
 * @internal
 */
export default function rankToNumber(rank: AccountRank): number {
	return rankList.indexOf(rank);
}
