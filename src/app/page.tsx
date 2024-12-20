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
			<p style={{ textAlign: "center" }}>
				{"This is some example text, "}
				<strong>{"this is bold"}</strong>
				{", "}
				<em>{" and this is italic"}</em>
				{"!"}
			</p>
			{/* TODO: Move player card mock-up to its own element. */}
			<h2>{"Player card mock-up:"}</h2>
			<div
				style={{
					aspectRatio: 3 / 1,
					backgroundColor: "#3c1185",
					backgroundImage:
						"url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Volibear_0.jpg)",
					backgroundSize: 600,
					borderRadius: 25,
					display: "grid",
					gridTemplate: "",
					width: 600
				}}
			>
				{/* TODO: WIP. */}
			</div>
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
