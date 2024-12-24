import type { MetadataRoute } from "next";
import domain from "scripts/domain";

/**
 * The website's robots file.
 * @public
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			allow: "/",
			userAgent: "*"
		},
		sitemap: `${domain}/sitemap.xml`
	};
}
