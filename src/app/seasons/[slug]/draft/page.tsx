import {
	accountTable,
	draftPlayerTable,
	playerTable,
	seasonTable,
	teamPlayerTable,
	teamTable
} from "db/schema";
import { type JSX } from "react";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import type { SeasonsPageParams } from "app/seasons/[slug]/page";
import db from "db/db";
import { eq } from "drizzle-orm";
import getSeasonUrl from "util/getSeasonUrl";
import { redirect } from "next/navigation";
import style from "./page.module.scss";

/**
 * A page that displays information about a season's players.
 * @param props - The properties that are passed to the page.
 * @returns The season players page.
 * @public
 */
export default async function Page(
	props: PageProps<SeasonsPageParams>
): Promise<JSX.Element> {
	const { slug } = await props.params;

	// Get drafted players.
	const seasonRows = await db
		.select()
		.from(seasonTable)
		.leftJoin(teamTable, eq(seasonTable.id, teamTable.seasonId))
		.leftJoin(teamPlayerTable, eq(teamTable.id, teamPlayerTable.teamId))
		.leftJoin(playerTable, eq(teamPlayerTable.playerId, playerTable.id))
		.leftJoin(draftPlayerTable, eq(playerTable.id, draftPlayerTable.playerId))
		.leftJoin(
			accountTable,
			eq(draftPlayerTable.playerId, accountTable.playerId)
		)
		.where(eq(seasonTable.slug, decodeURIComponent(slug)));
	const [first] = seasonRows;
	if (!first) {
		redirect("/seasons");
	}

	// Organize season, team, and drafted player data.
	const { season } = first;
	// TODO

	// Only care about players that have been signed up and assigned point values.
	const draftablePlayersRows = await db
		.select()
		.from(draftPlayerTable)
		.innerJoin(playerTable, eq(draftPlayerTable.playerId, playerTable.id))
		.leftJoin(accountTable, eq(playerTable.id, accountTable.playerId))
		.where(eq(draftPlayerTable.seasonId, season.id));
	void draftablePlayersRows; // TODO

	return <div className={style["content"]}></div>; // TODO
}

/**
 * The season players page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = async (
	props: PageProps<SeasonsPageParams>
): Promise<Metadata> => {
	const { slug: encoded } = await props.params;
	const slug = decodeURIComponent(encoded);
	const [season] = await db
		.select()
		.from(seasonTable)
		.where(eq(seasonTable.slug, slug))
		.limit(1);
	return season
		? {
				description: `The draft for Gauntlet Championship Series ${season.name}.`,
				openGraph: {
					url: `${getSeasonUrl(season)}/draft`
				},
				title: `${season.name} Draft`
			}
		: {
				description:
					"The draft for an unknown season of the Gauntlet Championship Series.",
				openGraph: {
					url: `${getSeasonUrl({ slug })}/draft`
				},
				title: "Unknown Season Draft"
			};
};
