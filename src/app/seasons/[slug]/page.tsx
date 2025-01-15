import AdminPanel from "./AdminPanel";
import Link from "components/Link";
import LocalDate from "components/LocalDate";
import MatchCard from "components/MatchCard";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { auth } from "db/auth";
import getMatchDateTime from "util/getMatchDateTime";
import getSeasonBySlug from "db/getSeasonBySlug";
import getSeasonUrl from "util/getSeasonUrl";
import getTeamGameResultsBySeason from "db/getMatchesBySeasons";
import getTeamUrl from "util/getTeamUrl";
import getTeamsBySeasons from "db/getTeamsBySeasons";
import leftHierarchy from "util/leftHierarchy";
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
	const matches = leftHierarchy(await getTeamGameResultsBySeason(season.id), [
		"match",
		"game",
		"gameResult",
		"teamGameResult"
	]);
	const rounds = matches.reduce((previousValue, currentValue) => {
		void (
			previousValue.get(currentValue.value.round)?.push(currentValue) ??
			previousValue.set(currentValue.value.round, [currentValue])
		);
		return previousValue;
	}, new Map<number, (typeof matches)[number][]>());

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
					.map(([round, roundMatches]) => (
						<div key={round}>
							<header>
								{roundMatches[0] ? (
									<h3>
										<LocalDate
											date={getMatchDateTime(roundMatches[0].value, season)}
											options={{ dateStyle: "full" }}
										/>
									</h3>
								) : (
									<h3>{`Round ${round.toString()}`}</h3>
								)}
							</header>
							{roundMatches
								.sort(
									({ value: { timeSlot: a } }, { value: { timeSlot: b } }) =>
										a - b
								)
								.map((match) => (
									<MatchCard
										key={match.value.id}
										match={match.value}
										season={season}
										teamGameResults={match.children
											.flatMap(({ children }) => children)
											.flatMap(({ children }) => children)}
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
