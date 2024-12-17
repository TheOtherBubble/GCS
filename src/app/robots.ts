import type { MetadataRoute } from "next";
import domain from "../scripts/domain";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			allow: "/",
			userAgent: "*"
		},
		sitemap: `${domain}/sitemap.xml`
	};
}
