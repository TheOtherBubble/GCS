import {
	gameResultTable,
	gameTable,
	matchTable,
	seasonTable,
	teamGameResultTable,
	teamTable
} from "db/schema";
import AdminPanel from "./AdminPanel";
import type { JSX } from "react";
import Link from "components/Link";
import MatchCard from "components/MatchCard";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import RoundHeader from "./RoundHeader";
import { auth } from "db/auth";
import db from "db/db";
import { eq } from "drizzle-orm";
import getMatchDateTime from "util/getMatchDateTime";
import getSeasonUrl from "util/getSeasonUrl";
import getTeamUrl from "util/getTeamUrl";
import leftHierarchy from "util/leftHierarchy";
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
 * @return The season page.
 * @public
 */
export default async function Page(
	props: PageProps<SeasonsPageParams>
): Promise<JSX.Element> {
	const { slug } = await props.params;
	const seasonRows = await db
		.select()
		.from(seasonTable)
		.leftJoin(matchTable, eq(seasonTable.id, matchTable.seasonId))
		.leftJoin(gameTable, eq(matchTable.id, gameTable.matchId))
		.leftJoin(
			gameResultTable,
			eq(gameTable.tournamentCode, gameResultTable.tournamentCode)
		)
		.leftJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.where(eq(seasonTable.vanityUrlSlug, decodeURIComponent(slug)));
	const [first] = seasonRows;
	if (!first) {
		redirect("/seasons");
	}

	// Organize season, match, game, game result, and team game result data.
	const { season } = first;
	const matches = leftHierarchy(
		seasonRows,
		"match",
		"game",
		"gameResult",
		"teamGameResult"
	);
	const rounds = matches.reduce((previousValue, currentValue) => {
		void (
			previousValue.get(currentValue.value.round)?.push(currentValue) ??
			previousValue.set(currentValue.value.round, [currentValue])
		);
		return previousValue;
	}, new Map<number, (typeof matches)[number][]>());

	// Determine the next upcoming round.
	let upcomingRound = 0;
	for (const [round, [firstMatchRow]] of Array.from(rounds).sort(
		([a], [b]) => a - b
	)) {
		if (!firstMatchRow) {
			continue;
		}

		if (
			getMatchDateTime(firstMatchRow.value, season).valueOf() >
			Date.now() - 1000 * 60 * 60 * 12
		) {
			upcomingRound = round;
			break;
		}
	}

	// Sort teams by pool and score for the leaderboard.
	const teams = await db
		.select()
		.from(teamTable)
		.where(eq(teamTable.seasonId, season.id));
	const teamScores = teams.map((team) => ({ losses: 0, team, wins: 0 }));
	for (const teamGameResult of leftHierarchy(seasonRows, "teamGameResult")) {
		const team = teamScores.find(
			({ team: value }) => value.id === teamGameResult.teamId
		);
		if (!team) {
			continue;
		}

		if (teamGameResult.isWinner) {
			team.wins++;
			continue;
		}

		team.losses++;
	}

	const poolScores = new Map<number, typeof teamScores>();
	for (const teamScore of teamScores) {
		const pool = poolScores.get(teamScore.team.pool);
		if (!pool) {
			poolScores.set(teamScore.team.pool, [teamScore]);
			continue;
		}

		pool.push(teamScore);
	}

	return (
		<div className={style["content"]}>
			<div className={style["info"]}>
				<header>
					<h1>{season.name}</h1>
					<hr />
				</header>
				{(await auth())?.user?.isAdministator && (
					<AdminPanel season={season} teams={teams} />
				)}
			</div>
			<div className={style["schedule"]}>
				<header>
					<h2>{"Schedule"}</h2>
				</header>
				<ol>
					{Array.from(rounds)
						.sort(([a], [b]) => a - b)
						.map(([round, roundMatches]) => (
							<li key={round}>
								<RoundHeader
									round={round}
									match={roundMatches[0]?.value}
									season={season}
									doScrollTo={round === upcomingRound}
								/>
								<ol>
									{roundMatches
										.sort(
											(
												{ value: { timeSlot: a, id: c } },
												{ value: { timeSlot: b, id: d } }
											) => a - b || c - d
										)
										.map((match) => (
											<li key={match.value.id}>
												<MatchCard
													match={match.value}
													season={season}
													teamGameResults={match.children
														.flatMap(({ children }) => children)
														.flatMap(({ children }) => children)}
													dateTimeFormatOptions={{
														day: "numeric",
														hour: "numeric",
														minute: "numeric",
														month: "long",
														timeZoneName: "short",
														weekday: "long"
													}}
													teams={teams}
												/>
											</li>
										))}
								</ol>
							</li>
						))}
				</ol>
			</div>
			<div className={style["leaderboards"]}>
				<header>
					<h2>{"Standings"}</h2>
				</header>
				<ol>
					{Array.from(poolScores)
						.sort(([a], [b]) => a - b)
						.map(([pool, scores]) => (
							<li key={pool}>
								<header>
									<h3>{`Pool ${pool.toString()}`}</h3>
								</header>
								<ol>
									{scores
										.sort((a, b) => b.wins - a.wins || a.losses - b.losses)
										.map(({ team, wins, losses }) => (
											<li key={team.id}>
												<Link href={getTeamUrl(team)}>{team.name}</Link>
												{` ${wins.toString()}-${losses.toString()}`}
											</li>
										))}
								</ol>
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
 * @return The metadata.
 * @public
 */
export const generateMetadata = async (
	props: PageProps<SeasonsPageParams>
): Promise<Metadata> => {
	const { slug } = await props.params;
	const vanityUrlSlug = decodeURIComponent(slug);
	const [season] = await db
		.select()
		.from(seasonTable)
		.where(eq(seasonTable.vanityUrlSlug, vanityUrlSlug))
		.limit(1);
	return season
		? {
				description: `The schedule for Gauntlet Championship Series ${season.name}.`,
				openGraph: {
					url: getSeasonUrl(season)
				},
				title: season.name
			}
		: {
				description: "An unknown season of the Gauntlet Championship Series.",
				openGraph: {
					url: getSeasonUrl({ vanityUrlSlug })
				},
				title: "Unknown Season"
			};
};
