import type { MetadataRoute } from "next";
import domain from "util/domain";

/**
 * The website's sitemap.
 * @returns The sitemap.
 * @public
 */
export default function sitemap() {
	return [
		{ url: new URL("/players", domain).href },
		{ url: new URL("/rulebook", domain).href },
		{ url: new URL("/schedule", domain).href },
		{ url: new URL("/seasons", domain).href },
		{ url: new URL("/teams", domain).href },
		{ url: new URL("/", domain).href }
	] satisfies MetadataRoute.Sitemap;
}
