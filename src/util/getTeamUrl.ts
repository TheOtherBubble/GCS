/**
 * Get the URL of the given team.
 * @param slug - The team's URI-encoded vanity URL slug.
 * @returns The URL.
 * @public
 */
export default function getTeamUrl(slug: string) {
	return `/teams/${slug}`;
}
