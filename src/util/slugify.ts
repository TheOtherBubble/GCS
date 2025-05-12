/**
 * Turn a string into a suitable slug (lowercase alphanumeric characters and hyphens only).
 * @param s - The original string.
 * @returns A suitable slug.
 * @public
 */
export default function slugify(s: string): string {
	return s
		.trim()
		.toLowerCase()
		.replace(/\s+/gu, "-")
		.replace(/[^a-z-0-9]/gu, "");
}
