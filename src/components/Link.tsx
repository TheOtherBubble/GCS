import {
	default as NextLink,
	type LinkProps as NextLinkProps
} from "next/link";
import type { JSX } from "react";
import domain from "../scripts/domain";

/**
 * Equivalent to the props that can be passed to a Next.js link or an anchor element.
 * @public
 */
export type LinkProps =
	| (Omit<NextLinkProps, keyof JSX.IntrinsicElements["a"]> &
			JSX.IntrinsicElements["a"])
	| JSX.IntrinsicElements["a"];

/**
 * Create a hyperlink. Uses Next.js-style preloading for internal links and HTML anchor elements for external links.
 * @param props - The properties to pass to the link.
 * @returns The link.
 * @public
 */
export default function Link(props: LinkProps) {
	// Destructure properties to access those that require custom logic.
	const { href, onMouseEnter, onTouchStart, onClick, ...remainingProps } =
		props;

	// Ensure that required properties are present.
	if (!href) {
		throw new Error("Link reference is required.");
	}

	// Ignore disallowed properties.
	void onMouseEnter;
	void onTouchStart;
	void onClick;

	// Restructure properties into a final form to pass to Next.js.
	const finalProps = { href, ...remainingProps };

	// Set default properties.
	if (
		!finalProps.href.startsWith("/") &&
		!finalProps.href.startsWith("#") &&
		!finalProps.href.startsWith(domain)
	) {
		finalProps.target ??= "_blank";
		finalProps.rel ??= "noreferrer noopener";
	}

	return <NextLink {...finalProps} />;
}
