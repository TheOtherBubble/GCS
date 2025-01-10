import type { Metadata } from "next";
import getLatestSeason from "db/getLatestSeason";
import getSeasonUrl from "util/getSeasonUrl";
import { redirect } from "next/navigation";

/**
 * The schedule page. Just redirects to the season page for the latest season.
 * @returns The schedule page.
 * @public
 */
export default async function Page() {
	const season = await getLatestSeason();
	if (season) {
		redirect(getSeasonUrl(encodeURIComponent(season.vanityUrlSlug)));
	}

	return <p>{"There are no seasons."}</p>;
}

/**
 * The schedule page's metadata. Designed to read as if it were the page being redirected to.
 * @returns The metadata.
 * @public
 */
export const metadata = {
	description:
		"The schedule for the latest season of the Gauntlet Championship Series.",
	openGraph: { url: "/schedule" },
	title: "Schedule"
} satisfies Metadata;
