import type { Metadata } from "next";

/**
 * The landing page.
 * @returns The landing page.
 * @public
 */
export default function Page() {
	return (
		<>
			<h1 style={{ textAlign: "center" }}>{"Gauntlet Championship Series"}</h1>
			<hr />
		</>
	);
}

/**
 * The metadata of the landing page.
 * @public
 */
export const metadata: Metadata = {
	description: "The home page of the Gauntlet Championship Series.",
	openGraph: { url: "/" },
	title: "Gauntlet Championship Series"
};

// TODO: `metadataBase` property in `metadata` export is not set? See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase.
