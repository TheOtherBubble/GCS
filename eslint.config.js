import { config, configs, parser, plugin } from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import eslint from "@eslint/js";
import { fileURLToPath } from "node:url";
import prettier from "eslint-plugin-prettier/recommended";

/**
 * ESLint configuration options.
 * @internal
 */
export default config(
	// Next.js ESLint rules.
	...new FlatCompat({
		baseDirectory: dirname(fileURLToPath(import.meta.url))
	}).extends("next/core-web-vitals", "next/typescript"),

	// Enable all ESLint rules.
	eslint.configs.all,

	// Disable specific rules.
	{
		rules: {
			// Possible Problems
			// N/A

			// Suggestions
			complexity: "off",
			"id-length": "off",
			"max-depth": "off",
			"max-lines": "off",
			"max-lines-per-function": "off",
			"max-nested-callbacks": "off",
			"max-params": "off",
			"max-statements": "off",
			"no-bitwise": "off",
			"no-continue": "off",
			"no-div-regex": "off",
			"no-inline-comments": "off",
			"no-label-var": "off",
			"no-labels": "off",
			"no-magic-numbers": "off",
			"no-nested-ternary": "off",
			"no-plusplus": "off",
			"no-shadow": "off", // Must use `@typescript-eslint/no-shadow` instead.
			"no-ternary": "off",
			"no-undef-init": "off",
			"no-void": "off",
			"no-warning-comments": "off",
			"one-var": ["error", "never"]

			// Layout and Formatting
			// N/A
		}
	},

	// Enable type checking and related rules.
	...configs.strictTypeChecked,
	...configs.stylisticTypeChecked,
	{
		languageOptions: {
			parser,
			parserOptions: {
				ecmaVersion: "latest",
				project: true,
				tsconfigRootDir: "."
			}
		},
		plugins: {
			"@typescript-eslint": plugin
		},
		rules: {
			"@typescript-eslint/no-shadow": "error"
		}
	},

	// Enable the Prettier plugin.
	prettier // Includes `eslint-config-prettier` and `eslint-plugin-prettier`.
);
