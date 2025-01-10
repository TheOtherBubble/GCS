/**
 * Get the URL of a player from a slug.
 * @param slug - The player's URI-encoded display name or Discord name.
 * @returns The URL.
 * @public
 */
export default function getPlayerUrlBySlug(slug: string) {
	return `/players/${slug}`;
}
