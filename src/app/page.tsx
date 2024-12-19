import type { Metadata } from "next";
import auth from "../scripts/auth";

/**
 * The landing page.
 * @returns The landing page.
 * @public
 */
export default async function Page() {
	const session = await auth.auth();

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
			{/* TODO: Relocate and clean up sign in/out button. */}
			{session ? (
				<form
					action={async () => {
						"use server";
						await auth.signOut();
					}}
				>
					<button type="submit">Sign out</button>
				</form>
			) : (
				<form
					action={async () => {
						"use server";
						await auth.signIn("discord");
					}}
				>
					<button type="submit">Sign in with Discord</button>
				</form>
			)}
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
