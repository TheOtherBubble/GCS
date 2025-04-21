/**
 * Determine whether or not two values are equivalent via a deep comparison.
 * @param a - The first value.
 * @param b - The second value.
 * @returns Whether or not the two values are equivalent.
 * @public
 */
export default function deepEquals(a: unknown, b: unknown): boolean {
	if (typeof a !== "object" || typeof b !== "object" || !a || !b) {
		return a === b;
	}

	if (a instanceof Date) {
		return b instanceof Date && a.valueOf() === b.valueOf();
	}

	const ae = Object.entries(a);
	const be = Object.entries(b);
	return (
		ae.length === be.length &&
		ae.every(([ak, av]) => deepEquals(av, be.find(([bk]) => ak === bk)?.[1]))
	);
}
