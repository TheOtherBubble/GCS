import type { JSX } from "react";
import type { Metadata } from "next";

/**
 * The page for 403 errors.
 * @returns An error page.
 * @public
 */
export default function Forbidden(): JSX.Element {
	return <h1>{"403 Forbidden"}</h1>;
}

/**
 * The metadata of the error page.
 * @public
 */
export const metadata = {
	description: "403 Forbidden",
	openGraph: { url: "/" },
	title: "403 Forbidden"
} satisfies Metadata;
