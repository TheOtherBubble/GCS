import AdminPanel from "./AdminPanel";
import ChangeSeasonForm from "./ChangeSeasonForm";
import type { Metadata } from "next";
import type PageProps from "scripts/PageProps";
import { auth } from "scripts/auth";
import getAllSeasons from "scripts/getAllSeasons";
import getAllTeamsWithSeasonId from "scripts/getAllTeamsWithSeasonId";
import getSeasonByVanityUrlSlug from "scripts/getSeasonByVanityUrlSlug";
import style from "./page.module.scss";

/**
 * Parameters that are passed to a season page.
 * @public
 */
export interface SeasonsPageParams {
	/** The season's encoded vanity URL slug. */
	slug: string;
}

/**
 * A page that displays information about a season.
 * @param props - The properties that are passed to the page.
 * @returns The season page.
 */
export default async function Page(props: PageProps<SeasonsPageParams>) {
	const seasons = await getAllSeasons();
	const { slug } = await props.params;
	const season = seasons.find(
		(value) => value.vanityUrlSlug === decodeURIComponent(slug)
	);

	if (!season) {
		return (
			<div className={style["content"]}>
				<div className={style["config"]}>
					<h1>{"Unknown Season"}</h1>
					<hr />
					<ChangeSeasonForm season={season} seasons={seasons} />
				</div>
			</div>
		);
	}

	return (
		<div className={style["content"]}>
			<div className={style["config"]}>
				<h1>{season.name}</h1>
				<hr />
				<ChangeSeasonForm season={season} seasons={seasons} />
				{(await auth())?.user?.isAdministator && (
					<AdminPanel
						season={season}
						teams={await getAllTeamsWithSeasonId(season.id)}
					/>
				)}
			</div>
			<div className={style["schedule"]}>
				<h2>{"Schedule"}</h2>
				<p>{"Coming soon..."}</p>
				{/* TODO */}
			</div>
			<div className={style["leaderboards"]}>
				<h2>{"Leaderboards"}</h2>
				<p>{"Coming soon..."}</p>
				{/* TODO */}
			</div>
		</div>
	);
}

/**
 * The season page's metadata.
 * @public
 */
export const generateMetadata = async (
	props: PageProps<SeasonsPageParams>
): Promise<Metadata> => {
	const { slug } = await props.params;
	const season = await getSeasonByVanityUrlSlug(decodeURIComponent(slug));

	return {
		description: season
			? `The schedule for Gauntlet Championship Series ${season.name}.`
			: "An unknown season of the Gauntlet Championship Series.",
		openGraph: { url: `/seasons/${slug}` },
		title: season?.name ?? "Unknown Season"
	};
};
