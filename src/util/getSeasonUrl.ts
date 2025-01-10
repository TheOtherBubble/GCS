/**
 * Get the URL of the given season.
 * @param slug - The season's URI-encoded vanity URL slug.
 * @returns The URL.
 * @public
 */
export default function getSeasonUrl(slug: string) {
	return `/seasons/${slug}`;
}
