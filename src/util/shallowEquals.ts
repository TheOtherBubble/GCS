/**
 * Determine whether or not two values are equivalent via a shallow comparison.
 * @param a - The first value.
 * @param b - The second value.
 * @returns Whether or not the two values are shallowly equivalent.
 * @public
 */
export default function shallowEquals(a: unknown, b: unknown): boolean {
	if (typeof a !== "object" || typeof b !== "object" || !a || !b) {
		return a === b;
	}

	const ae = Object.entries(a);
	const be = Object.entries(b);
	return (
		ae.length === be.length &&
		ae.every(([ak, av]) => be.find(([bk]) => ak === bk)?.[1] === av)
	);
}
