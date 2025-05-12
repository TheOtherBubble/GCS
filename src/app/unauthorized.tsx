import type { JSX } from "react";
import type { Metadata } from "next";

/**
 * The page for 401 errors.
 * @returns An error page.
 * @public
 */
export default function Unauthorized(): JSX.Element {
	return <h1>{"401 Unauthorized"}</h1>;
}

/**
 * The metadata of the error page.
 * @public
 */
export const metadata = {
	description: "401 Unauthorized",
	openGraph: { url: "/" },
	title: "401 Unauthorized"
} satisfies Metadata;
