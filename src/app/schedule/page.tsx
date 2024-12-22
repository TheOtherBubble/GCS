import type { Metadata } from "next";
import db from "../../scripts/db";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { seasonsTable } from "../../scripts/schema";

/**
 * Get the latest season by start date.
 * @returns The season, if any exists.
 * @internal
 */
const getCurrentSeason = async (): Promise<
	typeof seasonsTable.$inferSelect | undefined
> => {
	const [season] = await db
		.select()
		.from(seasonsTable)
		.orderBy(desc(seasonsTable.startDate))
		.limit(1);
	return season;
};

/**
 * The schedule page. Just redirects to the season page for the latest season.
 * @public
 */
export default async function Page() {
	const season = await getCurrentSeason();
	if (season) {
		redirect(`/seasons/${encodeURIComponent(season.vanityUrl)}`);
	}

	return <p>{"There are no seasons."}</p>;
}

/**
 * The schedule page's metadata. Designed to read as if it were the page being redirected to.
 * @public
 */
export const generateMetadata = async (): Promise<Metadata> => {
	const season = await getCurrentSeason();
	return {
		description: season
			? `The schedule for Gauntlet Championship Series ${season.name}.`
			: "The schedule for the latest season of the Gauntlet Championship Series.",
		openGraph: { url: "/schedule" },
		title: season?.name ?? "Schedule"
	};
};
