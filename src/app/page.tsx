import type { Metadata } from "next";

/**
 * The landing page.
 * @returns The landing page.
 * @public
 */
export default function Page() {
	return (
		<>
			<h1>{"Gauntlet Championship Series"}</h1>
			<hr />
			<p>{"Coming soon..."}</p>
		</>
	);
}

/**
 * The metadata of the landing page.
 * @public
 */
export const metadata = {
	description: "The home page of the Gauntlet Championship Series.",
	openGraph: { url: "/" },
	title: "Gauntlet Championship Series"
} satisfies Metadata;
