import type { JSX } from "react";
import Link from "components/Link";
import type { Metadata } from "next";
import db from "db/db";
import getSeasonUrl from "util/getSeasonUrl";
import { seasonTable } from "db/schema";

/**
 * The seasons list page.
 * @returns The seasons list page.
 * @public
 */
export default async function Page(): Promise<JSX.Element> {
	const seasons = await db.select().from(seasonTable);

	return (
		<>
			<h1>{"Seasons"}</h1>
			<ol>
				{seasons
					.sort(
						({ startDate: a }, { startDate: b }) =>
							new Date(a).valueOf() - new Date(b).valueOf()
					)
					.map((season) => (
						<li key={season.id}>
							<Link href={getSeasonUrl(season)}>{season.name}</Link>
						</li>
					))}
			</ol>
		</>
	);
}

/**
 * The metadata of the seasons list page.
 * @public
 */
export const metadata = {
	description: "The list of seasons of the Gauntlet Championship Series.",
	openGraph: { url: "/seasons" },
	title: "Seasons"
} satisfies Metadata;
