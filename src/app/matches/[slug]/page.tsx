import {
	accountTable,
	gameResultTable,
	gameTable,
	matchTable,
	playerGameResultTable,
	playerTable,
	seasonTable,
	teamGameResultTable,
	teamPlayerTable,
	teamTable
} from "db/schema";
import { and, eq, or } from "drizzle-orm";
import AdminPanel from "./AdminPanel";
import GameCard from "components/GameCard";
import LocalDate from "components/LocalDate";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import PlayerCard from "components/PlayerCard";
import TeamCard from "components/TeamCard";
import TournamentCode from "components/TournamentCode";
import { auth } from "db/auth";
import db from "db/db";
import getMatchDateTime from "util/getMatchDateTime";
import getMatchUrl from "util/getMatchUrl";
import leftHierarchy from "util/leftHierarchy";
import style from "./page.module.scss";

/**
 * Parameters that are passed to a match page.
 * @public
 */
export interface MatchesPageParams {
	/** The match's ID (stringified). */
	slug: `${number}`;
}

/**
 * A page that displays information about a match.
 * @param props - The properties that are passed to the page.
 * @returns The match page.
 * @public
 */
export default async function Page(props: PageProps<MatchesPageParams>) {
	// Organize season and match data.
	const { slug } = await props.params;
	const rows = await db
		.select()
		.from(seasonTable)
		.innerJoin(matchTable, eq(seasonTable.id, matchTable.seasonId))
		.leftJoin(gameTable, eq(matchTable.id, gameTable.matchId))
		.leftJoin(
			gameResultTable,
			eq(gameTable.tournamentCode, gameResultTable.tournamentCode)
		)
		.leftJoin(
			teamGameResultTable,
			eq(gameResultTable.id, teamGameResultTable.gameResultId)
		)
		.leftJoin(
			playerGameResultTable,
			and(
				eq(
					teamGameResultTable.gameResultId,
					playerGameResultTable.gameResultId
				),
				eq(teamGameResultTable.team, playerGameResultTable.team)
			)
		)
		.where(eq(matchTable.id, parseInt(slug, 10)));
	const [first] = rows;
	if (!first) {
		return <p>{"Unknown match."}</p>;
	}

	// Organize team, player, and account data.
	const { season, match } = first;
	const teamRows = await db
		.select()
		.from(matchTable)
		.leftJoin(
			teamTable,
			or(
				eq(matchTable.blueTeamId, teamTable.id),
				eq(matchTable.redTeamId, teamTable.id)
			)
		)
		.leftJoin(teamPlayerTable, eq(teamTable.id, teamPlayerTable.teamId))
		.leftJoin(playerTable, eq(teamPlayerTable.playerId, playerTable.id))
		.leftJoin(accountTable, eq(playerTable.id, accountTable.playerId))
		.where(eq(matchTable.id, match.id));
	const teamHierarchies = leftHierarchy(teamRows, "team", "player", "account");
	const allPlayers = leftHierarchy(teamRows, "player");
	const allAccounts = leftHierarchy(teamRows, "account");
	const blueTeam = teamHierarchies.find(
		({ value: { id } }) => id === match.blueTeamId
	);
	const redTeam = teamHierarchies.find(
		({ value: { id } }) => id === match.redTeamId
	);
	if (!blueTeam || !redTeam) {
		return <p>{"Unknown team."}</p>;
	}

	// Organize game, game result, team game result, and player game result data.
	const gameHierarchies = leftHierarchy(
		rows,
		"game",
		"gameResult",
		"teamGameResult",
		"playerGameResult"
	);

	// Get the next unfinished game.
	const [nextGame] = gameHierarchies
		.filter(({ children }) => children.length === 0)
		.map(({ value }) => value)
		.sort(({ id: a }, { id: b }) => a - b);

	// The tournament code is visible if the viewer is logged in and either the viewer is an administrator or the viewer is on a team in the match.
	const session = await auth();
	const canViewTournamentCode =
		session?.user &&
		(session.user.isAdmin || allPlayers.includes(session.user));

	return (
		<div className={style["content"]}>
			<div className={style["team"]}>
				<header>
					<TeamCard team={blueTeam.value} season={season} />
					<hr />
				</header>
				<ul>
					{blueTeam.children.map(({ value: player, children: accounts }) => (
						<li key={player.id}>
							<PlayerCard
								player={player}
								accounts={accounts}
								// TODO: Player teams and KDAs.
							/>
						</li>
					))}
				</ul>
			</div>
			<div className={style["games"]}>
				<header>
					<h1>{`${blueTeam.value.name} vs ${redTeam.value.name}`}</h1>
					<h2>
						<LocalDate
							date={getMatchDateTime(match, season)}
							options={{
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
								month: "long",
								timeZoneName: "short",
								weekday: "long"
							}}
						/>
						{` - ${match.format}`}
					</h2>
					{nextGame && canViewTournamentCode && (
						<TournamentCode tournamentCode={nextGame.tournamentCode} />
					)}
					<h2>{"Games"}</h2>
				</header>
				<ol>
					{gameHierarchies
						.sort(({ value: { id: a } }, { value: { id: b } }) => a - b)
						.map(({ children: [gameResult], value: game }) => (
							<GameCard
								key={game.id}
								game={game}
								gameResult={gameResult?.value}
								teamGameResults={gameResult?.children.map(({ value }) => value)}
								playerGameResults={gameResult?.children.flatMap(
									({ children }) => children
								)}
								players={allPlayers}
								accounts={allAccounts}
							/>
						))}
				</ol>
				{(await auth())?.user?.isAdmin && <AdminPanel match={match} />}
			</div>
			<div className={style["team"]}>
				<header>
					<TeamCard team={redTeam.value} season={season} />
					<hr />
				</header>
				<ul>
					{redTeam.children.map(({ value: player, children: accounts }) => (
						<li key={player.id}>
							<PlayerCard
								player={player}
								accounts={accounts}
								// TODO: Player teams and KDAs.
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

/**
 * The match page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = async (
	props: PageProps<MatchesPageParams>
): Promise<Metadata> => {
	const { slug } = await props.params;
	return {
		description: `Gauntlet Championship Series match #${slug}`,
		openGraph: { url: getMatchUrl({ id: parseInt(slug, 10) }) },
		title: `Match #${slug}`
	};
};
