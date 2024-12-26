import getSeasonUrl, { getSeasonUrlByEncodedSlug } from "utility/getSeasonUrl";
import { matchTable, teamGameResultTable, teamTable } from "db/schema";
import AdminPanel from "./AdminPanel";
import ChangeSeasonForm from "./ChangeSeasonForm";
import MatchCard from "components/MatchCard";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { auth } from "db/auth";
import getAllSeasons from "db/getAllSeasons";
import getAllTeamsWithSeasonId from "db/getAllTeamsWithSeasonId";
import getSeasonByEncodedSlug from "db/getSeasonByEncodedSlug";
import getTeamGameResultsBySeason from "db/getTeamGameResultsBySeason";
import multiclass from "utility/multiclass";
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
 * @public
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

	const rows = await getTeamGameResultsBySeason(season);
	const rounds = new Map<
		number,
		{
			match: typeof matchTable.$inferSelect;
			teamGameResults: (typeof teamGameResultTable.$inferSelect)[];
			teams: (typeof teamTable.$inferSelect)[];
		}[]
	>(); // Round numbers to match IDs in that round.
	for (const row of rows) {
		// Add a match to an existing round.
		const round = rounds.get(row.match.round);
		if (round) {
			// Add data to an existing match.
			const match = round.find((value) => value.match.id === row.match.id);
			if (match) {
				if (
					row.teamGameResult &&
					!match.teamGameResults.some(
						(teamGameResult) => teamGameResult.id === row.teamGameResult?.id
					)
				) {
					match.teamGameResults.push(row.teamGameResult);
				}

				if (row.team && !match.teams.some((team) => team.id === row.team?.id)) {
					match.teams.push(row.team);
				}

				continue;
			}

			// Insert a new match.
			round.push({
				match: row.match,
				teamGameResults: row.teamGameResult ? [row.teamGameResult] : [],
				teams: row.team ? [row.team] : []
			});
			continue;
		}

		// Insert match as the first in its round.
		rounds.set(row.match.round, [
			{
				match: row.match,
				teamGameResults: row.teamGameResult ? [row.teamGameResult] : [],
				teams: row.team ? [row.team] : []
			}
		]);
	}

	return (
		<div className={style["content"]}>
			<div className={style["config"]}>
				<h1>{season.name}</h1>
				<hr />
				<div className={style["hide-on-mobile"]}>
					<ChangeSeasonForm season={season} seasons={seasons} />
					{(await auth())?.user?.isAdministator && (
						<AdminPanel
							className={style["hide-on-mobile"]}
							season={season}
							teams={await getAllTeamsWithSeasonId(season.id)} // TODO: Join.
						/>
					)}
				</div>
			</div>
			<div className={style["schedule"]}>
				<h2>{"Schedule"}</h2>
				{Array.from(rounds)
					.sort(([a], [b]) => a - b)
					.map(([round, matches]) => (
						<div key={round} className={style["round"]}>
							<h3>
								{"Round "}
								{round}
							</h3>
							{matches.map((match) => (
								<MatchCard
									key={match.match.id}
									match={match.match}
									teamGameResults={match.teamGameResults}
									teams={match.teams}
								/>
							))}
						</div>
					))}
				{/* TODO */}
			</div>
			<div
				className={multiclass(style["leaderboards"], style["hide-on-mobile"])}
			>
				<h2>{"Leaderboards"}</h2>
				<p>{"Coming soon..."}</p>
				{/* TODO */}
			</div>
		</div>
	);
}

/**
 * The season page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = async (
	props: PageProps<SeasonsPageParams>
): Promise<Metadata> => {
	const { slug } = await props.params;
	const season = await getSeasonByEncodedSlug(slug);

	return season
		? {
				description: `The schedule for Gauntlet Championship Series ${season.name}.`,
				openGraph: { url: getSeasonUrl(season) },
				title: season.name
			}
		: {
				description: "An unknown season of the Gauntlet Championship Series.",
				openGraph: { url: getSeasonUrlByEncodedSlug(slug) },
				title: "Unknown Season"
			};
};
