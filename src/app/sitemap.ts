import type { MetadataRoute } from "next";
import domain from "utility/domain";

/**
 * The website's sitemap.
 * @returns The sitemap.
 * @public
 */
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: `${domain}/rulebook` },
		{ url: `${domain}/schedule` },
		{ url: `${domain}/` }
	];
}
