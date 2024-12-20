import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: { remotePatterns: [{ hostname: "ddragon.leagueoflegends.com" }] },
	pageExtensions: ["ts", "tsx"]
};

/**
 * Next.js configuration options.
 * @public
 */
export default nextConfig;
