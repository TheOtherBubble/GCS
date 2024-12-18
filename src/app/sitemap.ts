import type { MetadataRoute } from "next";
import domain from "../scripts/domain";

/**
 * The website's sitemap.
 * @public
 */
export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: `${domain}/` }];
}
