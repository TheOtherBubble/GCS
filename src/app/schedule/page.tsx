import type { Metadata } from "next";
import getLatestSeason from "scripts/getLatestSeason";
import getSeasonUrl from "scripts/getSeasonUrl";
import { redirect } from "next/navigation";

/**
 * The schedule page. Just redirects to the season page for the latest season.
 * @returns The schedule page.
 * @public
 */
export default async function Page() {
	const season = await getLatestSeason();
	if (season) {
		redirect(getSeasonUrl(season));
	}

	return <p>{"There are no seasons."}</p>;
}

/**
 * The schedule page's metadata. Designed to read as if it were the page being redirected to.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = async (): Promise<Metadata> => {
	const season = await getLatestSeason();
	return {
		description: season
			? `The schedule for Gauntlet Championship Series ${season.name}.`
			: "The schedule for the latest season of the Gauntlet Championship Series.",
		openGraph: { url: "/schedule" },
		title: season?.name ?? "Schedule"
	};
};
