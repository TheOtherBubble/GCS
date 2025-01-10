import Link from "components/Link";
import type { Metadata } from "next";
import getAllSeasons from "db/getAllSeasons";
import getSeasonUrl from "util/getSeasonUrl";

/**
 * The seasons list page.
 * @returns The seasons list page.
 * @public
 */
export default async function Page() {
	const seasons = await getAllSeasons();

	return (
		<>
			<h1>{"Seasons"}</h1>
			<ul>
				{seasons.map((season) => (
					<li key={season.id}>
						<Link href={getSeasonUrl(encodeURIComponent(season.vanityUrlSlug))}>
							{season.name}
						</Link>
					</li>
				))}
			</ul>
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
