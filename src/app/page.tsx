import type { Metadata } from "next";

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

export const metadata: Metadata = {
	description: "The home page of the VeryLastNerve League.",
	openGraph: { url: "/" },
	title: "Home"
};
