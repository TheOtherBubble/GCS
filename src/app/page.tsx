import type { Metadata } from "next";

/**
 * The landing page.
 * @returns The landing page.
 * @public
 */
export default function Page() {
	return (
		<>
			<h1 style={{ textAlign: "center" }}>{"VLN League"}</h1>
			<hr />
			<p style={{ textAlign: "center" }}>
				{"This is some example text, "}
				<strong>{"this is bold"}</strong>
				{", "}
				<em>{" and this is italic"}</em>
				{"!"}
			</p>
		</>
	);
}

/**
 * The metadata of the landing page.
 * @public
 */
export const metadata: Metadata = {
	description: "The home page of the VeryLastNerve League.",
	openGraph: { url: "/" },
	title: "VLN League"
};
