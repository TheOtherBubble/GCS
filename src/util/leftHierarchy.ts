import type { Tree } from "types/Tree";
import shallowEquals from "./shallowEquals";

/**
 * Organize the result of a left-joined query into a hierarchy.
 * @param rows - The result of the query.
 * @param keys - The order of the levels of the hierarchy.
 * @return The organized result.
 * @public
 */
export default function leftHierarchy<
	T extends object,
	U extends keyof T,
	V extends (keyof T)[]
>(rows: readonly T[], ...keys: readonly [U, ...V]): Tree<T, [U, ...V]>[] {
	const out: Tree<T, [U, ...V]>[] = [];

	// Recursive terminator.
	const [key, childKey, ...remainingKeys] = keys;
	if (!childKey) {
		for (const row of rows) {
			// Exclude null values.
			const value = row[key];
			if (!value) {
				continue;
			}

			// Skip the row if the value has already been added.
			if (out.some((other) => shallowEquals(value, other))) {
				continue;
			}

			// Otherwise, add the value.
			out.push(value as Tree<T, [U, ...V]>);
		}

		return out;
	}

	for (const row of rows) {
		// Exclude null values.
		const value = row[key];
		if (!value) {
			continue;
		}

		// Skip the row if the value has already been added.
		if (
			out.some((other) => "value" in other && shallowEquals(value, other.value))
		) {
			continue;
		}

		// Otherwise, add the value and its children recursively.
		out.push({
			children: leftHierarchy(
				rows.filter((other) => shallowEquals(value, other[key])),
				childKey,
				...remainingKeys
			),
			value
		} as Tree<T, [U, ...V]>);
	}

	return out;
}
