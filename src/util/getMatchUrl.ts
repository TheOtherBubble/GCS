/**
 * Get the URL of the given match.
 * @param slug - The match's stringified ID.
 * @returns The URL.
 * @public
 */
export default function getMatchUrl(slug: `${number}`) {
	return `/matches/${slug}`;
}
