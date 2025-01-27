import type { JSX } from "react";
import type { Metadata } from "next";
import db from "db/db";
import { desc } from "drizzle-orm";
import getSeasonUrl from "util/getSeasonUrl";
import { redirect } from "next/navigation";
import { seasonTable } from "db/schema";

/**
 * The schedule page. Just redirects to the season page for the latest season.
 * @return The schedule page.
 * @public
 */
export default async function Page(): Promise<JSX.Element> {
	// Get latest season data.
	const [season] = await db
		.select()
		.from(seasonTable)
		.orderBy(desc(seasonTable.startDate))
		.limit(1);
	if (season) {
		redirect(getSeasonUrl(season));
	}

	return <p>{"There are no seasons."}</p>;
}

/**
 * The schedule page's metadata. Designed to read as if it were the page being redirected to.
 * @return The metadata.
 * @public
 */
export const metadata = {
	description:
		"The schedule for the latest season of the Gauntlet Championship Series.",
	openGraph: { url: "/schedule" },
	title: "Schedule"
} satisfies Metadata;
