import getSeasonUrl, { getSeasonUrlByEncodedSlug } from "util/getSeasonUrl";
import type { matchTable, teamGameResultTable } from "db/schema";
import AdminPanel from "./AdminPanel";
import ChangeSeasonForm from "./ChangeSeasonForm";
import Link from "components/Link";
import MatchCard from "components/MatchCard";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { auth } from "db/auth";
import getAllSeasons from "db/getAllSeasons";
import getAllTeamsWithSeasonId from "db/getAllTeamsWithSeasonId";
import getSeasonByEncodedSlug from "db/getSeasonByEncodedSlug";
import getTeamGameResultsBySeason from "db/getMatchesBySeason";
import getTeamUrl from "util/getTeamUrl";
import multiclass from "util/multiclass";
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

	// Prompt the user to select another season if none is found.
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

	// Sort teams by score for the leaderboard.
	const teams = await getAllTeamsWithSeasonId(season.id);
	const teamScores = teams.map((team) => ({ losses: 0, team, wins: 0 }));

	// Split matches into rounds for displaying.
	const rows = await getTeamGameResultsBySeason(season);
	const rounds = new Map<
		number,
		{
			match: typeof matchTable.$inferSelect;
			teamGameResults: (typeof teamGameResultTable.$inferSelect)[];
		}[]
	>(); // Round numbers to match IDs in that round.
	for (const row of rows) {
		// Add wins/losses to team scores.
		if (row.teamGameResult) {
			const teamScore = teamScores.find(
				(value) => value.team.id === row.teamGameResult?.teamId
			);
			if (teamScore) {
				if (row.teamGameResult.isWinner) {
					teamScore.wins++;
				} else {
					teamScore.losses++;
				}
			}
		}

		// Insert match as the first in its round.
		const round = rounds.get(row.match.round);
		if (!round) {
			rounds.set(row.match.round, [
				{
					match: row.match,
					teamGameResults: row.teamGameResult ? [row.teamGameResult] : []
				}
			]);
			continue;
		}

		// Insert a new match.
		const match = round.find((value) => value.match.id === row.match.id);
		if (!match) {
			round.push({
				match: row.match,
				teamGameResults: row.teamGameResult ? [row.teamGameResult] : []
			});
			continue;
		}

		// Nothing more to add if there's no team game result.
		if (!row.teamGameResult) {
			continue;
		}

		// Add data to an existing match.
		match.teamGameResults.push(row.teamGameResult);
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
							teams={teams}
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
									teams={teams}
								/>
							))}
						</div>
					))}
			</div>
			<div
				className={multiclass(style["leaderboards"], style["hide-on-mobile"])}
			>
				<h2>{"Leaderboards"}</h2>
				<h3>{"Standings"}</h3>
				<ol>
					{teamScores
						.sort((a, b) => a.wins - b.wins || b.losses - a.losses)
						.map(({ team, wins, losses }) => (
							<li key={team.id}>
								<Link href={getTeamUrl(team)}>{team.name}</Link>
								{` ${wins.toString()}-${losses.toString()}`}
							</li>
						))}
				</ol>
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
