import type { NextConfig } from "next";

/**
 * Next.js configuration options.
 * @internal
 */
export default {
	images: { remotePatterns: [{ hostname: "ddragon.leagueoflegends.com" }] },
	pageExtensions: ["ts", "tsx"]
} satisfies NextConfig;
