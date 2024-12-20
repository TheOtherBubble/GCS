import type { Metadata } from "next";
import RankedEmblem from "../components/RankedEmblem/RankedEmblem";

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
					backgroundSize: 620, // `width + 2 * padding`
					borderRadius: 25,
					display: "grid",
					gap: 0,
					grid: "1fr 2fr 1fr / 1fr 1fr 2fr",
					justifyItems: "center",
					padding: 10,
					width: 600
				}}
			>
				{/* TODO: WIP. */}
				<div
					style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 10 }}
				>
					<h2
						style={{
							gridArea: "1 / 1 / 2 / 2",
							margin: 0,
							padding: 10
						}}
					>
						{"Lakuna"}
					</h2>
				</div>
				<RankedEmblem
					tier="DIAMOND"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						borderRadius: 10,
						gridArea: "2 / 3 / 3 / 4",
						height: "auto",
						maxHeight: "100%",
						maxWidth: "100%",
						padding: 10,
						width: "auto"
					}}
				/>
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
