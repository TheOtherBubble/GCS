/**
 * Given a list of values, determine which of the mapped lists is the closest match and return its key.
 * @param list - The list of values to match.
 * @param map - A map of keys to lists of values.
 * @return The key of the closest-matching list of values, or `undefined` if no list of values matched at all.
 * @public
 */
export default function closestMatch<T, U>(list: U[], map: Map<T, U[]>) {
	let out: T | undefined = void 0;
	let outScore = 0;
	for (const [teamId, puuids] of map.entries()) {
		const score = list.filter((a) => puuids.some((b) => a === b)).length;
		if (score <= outScore) {
			continue;
		}

		out = teamId;
		outScore = score;
	}

	return out;
}
