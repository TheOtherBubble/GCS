import AdminPanel from "./AdminPanel";
import Link from "components/Link";
import LocalDate from "components/LocalDate";
import type { Match } from "types/db/Match";
import MatchCard from "components/MatchCard";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import type { TeamGameResult } from "types/db/TeamGameResult";
import { auth } from "db/auth";
import getMatchDateTime from "util/getMatchDateTime";
import getSeasonBySlug from "db/getSeasonBySlug";
import getSeasonUrl from "util/getSeasonUrl";
import getTeamGameResultsBySeason from "db/getMatchesBySeasons";
import getTeamUrl from "util/getTeamUrl";
import getTeamsBySeasons from "db/getTeamsBySeasons";
import multiclass from "util/multiclass";
import { redirect } from "next/navigation";
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
	const { slug } = await props.params;
	const season = await getSeasonBySlug(slug);
	if (!season) {
		redirect("/seasons");
	}

	// Sort teams by score for the leaderboard.
	const teams = await getTeamsBySeasons(season.id);
	const teamScores = teams.map((team) => ({ losses: 0, team, wins: 0 }));

	// Split matches into rounds for displaying.
	const rows = await getTeamGameResultsBySeason(season.id);
	const rounds = new Map<
		number,
		{
			match: Match;
			teamGameResults: TeamGameResult[];
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
			<div className={style["info"]}>
				<h1>{season.name}</h1>
				<hr />
				<div>
					{(await auth())?.user?.isAdministator && (
						<AdminPanel
							className="hide-on-mobile"
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
						<div key={round}>
							<header>
								{matches[0] ? (
									<h3>
										<LocalDate
											date={getMatchDateTime(matches[0].match, season)}
											options={{ dateStyle: "full" }}
										/>
									</h3>
								) : (
									<h3>{`Round ${round.toString()}`}</h3>
								)}
							</header>
							{matches
								.sort(
									({ match: { timeSlot: a } }, { match: { timeSlot: b } }) =>
										a - b
								)
								.map((match) => (
									<MatchCard
										key={match.match.id}
										match={match.match}
										season={season}
										teamGameResults={match.teamGameResults}
										dateTimeFormatOptions={{
											dateStyle: "long",
											timeStyle: "short"
										}}
										teams={teams}
									/>
								))}
						</div>
					))}
			</div>
			<div className={multiclass(style["leaderboards"], "hide-on-mobile")}>
				<h2>{"Leaderboards"}</h2>
				<h3>{"Standings"}</h3>
				<ol>
					{teamScores
						.sort((a, b) => a.wins - b.wins || b.losses - a.losses)
						.map(({ team, wins, losses }) => (
							<li key={team.id}>
								<Link href={getTeamUrl(encodeURIComponent(team.vanityUrlSlug))}>
									{team.name}
								</Link>
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
export const generateMetadata = async (props: PageProps<SeasonsPageParams>) => {
	const { slug } = await props.params;
	const season = await getSeasonBySlug(slug);
	return (
		season
			? {
					description: `The schedule for Gauntlet Championship Series ${season.name}.`,
					openGraph: {
						url: getSeasonUrl(encodeURIComponent(season.vanityUrlSlug))
					},
					title: season.name
				}
			: {
					description: "An unknown season of the Gauntlet Championship Series.",
					openGraph: { url: getSeasonUrl(slug) },
					title: "Unknown Season"
				}
	) satisfies Metadata;
};
