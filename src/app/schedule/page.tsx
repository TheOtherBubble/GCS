import type { Metadata } from "next";
import db from "../../scripts/db";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { seasons } from "../../scripts/schema";

const getCurrentSeason = async (): Promise<typeof seasons.$inferSelect> => {
	// Get the latest season by start date.
	const [season] = await db
		.select()
		.from(seasons)
		.orderBy(desc(seasons.startDate))
		.limit(1);

	// Ensure that the season was returned.
	if (!season) {
		throw new Error("There are no seasons!");
	}

	return season;
};

/**
 * The schedule page. Just redirects to the season page for the latest season.
 * @public
 */
export default async function Page() {
	redirect(`/seasons/${(await getCurrentSeason()).id.toString()}`);
}

/**
 * The schedule page's metadata. Designed to read as if it were the page being redirected to.
 * @public
 */
export const generateMetadata = async (): Promise<Metadata> => {
	const season = await getCurrentSeason();
	const name = season.name ?? `Season ${season.id.toString()}`;

	return {
		description: `The schedule for Gauntlet Championship Series ${name}.`,
		openGraph: { url: "/schedule" },
		title: name
	};
};
