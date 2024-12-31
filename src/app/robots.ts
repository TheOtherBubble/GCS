import type { MetadataRoute } from "next";
import domain from "util/domain";

/**
 * The website's robots file.
 * @returns The robots file.
 * @public
 */
export default function robots() {
	return {
		rules: {
			allow: "/",
			userAgent: "*"
		},
		sitemap: `${domain}/sitemap.xml`
	} satisfies MetadataRoute.Robots;
}
