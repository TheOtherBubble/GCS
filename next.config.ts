import type { Configuration } from "webpack";
import type { NextConfig } from "next";

/**
 * Next.js configuration options.
 * @internal
 */
export default {
	experimental: {
		authInterrupts: true,
		turbo: { rules: { "*.svg": { as: "*.js", loaders: ["@svgr/webpack"] } } }
	},
	images: { remotePatterns: [{ hostname: "ddragon.leagueoflegends.com" }] },
	pageExtensions: ["ts", "tsx"],
	webpack: (config: Configuration) => {
		// Find the existing rule that handles SVG imports.
		const fileLoaderRule = config.module?.rules?.find(
			(rule) =>
				typeof rule === "object" &&
				rule?.test instanceof RegExp &&
				rule.test.test(".svg")
		);

		if (
			typeof fileLoaderRule === "object" &&
			fileLoaderRule?.issuer &&
			typeof fileLoaderRule.resourceQuery === "object" &&
			"not" in fileLoaderRule.resourceQuery
		) {
			// Use the existing rule only for SVG imports ending in `"?url"`.
			config.module?.rules?.push({
				...fileLoaderRule,
				resourceQuery: /url/u,
				test: /\.svg$/iu
			});

			// Convert all other SVG imports to React components.
			config.module?.rules?.push({
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [fileLoaderRule.resourceQuery.not, /url/u] },
				test: /\.svg$/iu,
				use: ["@svgr/webpack"]
			});

			// Modify the file loader rule to ignore SVG imports since we handle it now.
			fileLoaderRule.exclude = /\.svg$/iu;
		}

		// Return the modified configuration.
		return config;
	}
} satisfies NextConfig;
