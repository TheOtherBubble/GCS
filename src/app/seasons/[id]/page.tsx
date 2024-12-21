import type { Metadata } from "next";
import db from "../../../scripts/db";
import { eq } from "drizzle-orm";
import { seasons } from "../../../scripts/schema";

const getSeasonById = async (
	id: number
): Promise<typeof seasons.$inferSelect> => {
	// Get the latest season by start date.
	const [season] = await db
		.select()
		.from(seasons)
		.where(eq(seasons.id, id))
		.limit(1);

	// Ensure that the season was returned.
	if (!season) {
		throw new Error("There are no seasons!");
	}

	return season;
};

/**
 * Parameters that are passed to a season page.
 * @public
 */
export interface SeasonsPageParams {
	/** The ID of the season in string form. */
	id: string;
}

/**
 * Properties that are passed to a season page.
 * @public
 */
export interface SeasonsPageProps {
	/** The parameters that were passed to the page. */
	params: Promise<SeasonsPageParams>;
}

/**
 * A page that displays information about a season.
 * @param params - The dynamic route parameters, including the ID of the season.
 * @returns The season page.
 */
export default async function Page(props: SeasonsPageProps) {
	const season = await getSeasonById(parseInt((await props.params).id, 10));
	const name = season.name ?? `Season ${season.id.toString()}`;

	return <h1>{name}</h1>; // TODO
}

/**
 * The season page's metadata.
 * @public
 */
export const generateMetadata = async (
	props: SeasonsPageProps
): Promise<Metadata> => {
	const { id } = await props.params;
	const season = await getSeasonById(parseInt(id, 10));
	const name = season.name ?? `Season ${season.id.toString()}`;

	return {
		description: `The schedule for Gauntlet Championship Series ${name}.`,
		openGraph: { url: `/seasons/${id}` },
		title: name
	};
};
