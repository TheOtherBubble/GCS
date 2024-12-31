import type { MetadataRoute } from "next";
import domain from "util/domain";

/**
 * The website's sitemap.
 * @returns The sitemap.
 * @public
 */
export default function sitemap() {
	return [
		{ url: `${domain}/rulebook` },
		{ url: `${domain}/schedule` },
		{ url: `${domain}/` }
	] satisfies MetadataRoute.Sitemap;
}
