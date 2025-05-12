import type { JSX } from "react";
import type { Metadata } from "next";

/**
 * The page for 404 errors.
 * @returns An error page.
 * @public
 */
export default function NotFound(): JSX.Element {
	return <h1>{"404 Not Found"}</h1>;
}

/**
 * The metadata of the error page.
 * @public
 */
export const metadata = {
	description: "404 Not Found",
	openGraph: { url: "/" },
	title: "404 Not Found"
} satisfies Metadata;
