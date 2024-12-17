import type { MetadataRoute } from "next";
import domain from "../scripts/domain";

export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: `${domain}/` }];
}
