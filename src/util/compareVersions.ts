/**
 * Compare two semantic versions.
 * @param a - The first semantic version.
 * @param b - The second semantic version.
 * @return A negative number if `a` is less than `b`, zero if `a` and `b` are equal, or a positive number if `a` is greater than `b`.
 * @see {@link https://semver.org/ | Semantic Versioning}
 * @public
 */
export default function compareVersions(
	a:
		| `${number}`
		| `${number}.${number}`
		| `${number}.${number}.${number}${string}`,
	b:
		| `${number}`
		| `${number}.${number}`
		| `${number}.${number}.${number}${string}`
) {
	const [aMajor, aMinor, aPatch] = a
		.split(".")
		.map((version) => parseInt(version, 10));
	const [bMajor, bMinor, bPatch] = b
		.split(".")
		.map((version) => parseInt(version, 10));

	return (
		(aMajor ?? 0) - (bMajor ?? 0) ||
		(aMinor ?? 0) - (bMinor ?? 0) ||
		(aPatch ?? 0) - (bPatch ?? 0)
	);
}
