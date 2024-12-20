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
export type LinkProps = NextLinkProps | JSX.IntrinsicElements["a"];

/**
 * Create a hyperlink. Uses Next.js-style preloading for internal links and HTML anchor elements for external links.
 * @param props - The properties to pass to the link.
 * @returns The link.
 * @public
 */
export default function Link({
	href = "",
	onMouseEnter,
	onTouchStart,
	onClick,
	...props
}: LinkProps) {
	const hrefString = typeof href === "string" ? href : (href.href ?? "");

	// Events cannot be passed to client components.
	void onMouseEnter;
	void onTouchStart;
	void onClick;

	return hrefString.startsWith("/") ||
		hrefString.startsWith(domain) ||
		hrefString.startsWith("#") ? (
		<NextLink href={href} {...props} />
	) : (
		<a href={hrefString} {...props} target="_blank" rel="noreferrer noopener" />
	);
}
