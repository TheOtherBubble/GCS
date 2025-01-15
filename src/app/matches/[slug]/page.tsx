import GameCard from "components/GameCard";
import LocalDate from "components/LocalDate";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import PlayerCard from "components/PlayerCard";
import TeamCard from "components/TeamCard";
import getGamesByMatches from "db/getGamesByMatches";
import getMatchDateTime from "util/getMatchDateTime";
import getMatchUrl from "util/getMatchUrl";
import getMatches from "db/getMatches";
import getPlayersByTeams from "db/getPlayersByTeams";
import getSeasons from "db/getSeasons";
import getTeams from "db/getTeams";
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
	const { slug } = await props.params;
	const [match] = await getMatches(parseInt(slug, 10));
	if (!match) {
		return <p>{"Unknown match."}</p>;
	}

	const [season] = await getSeasons(match.seasonId);
	const teams = await getTeams(match.blueTeamId, match.redTeamId);
	const blueTeam = teams.find((team) => team.id === match.blueTeamId);
	const redTeam = teams.find((team) => team.id === match.redTeamId);
	if (!blueTeam || !redTeam) {
		return <p>{"Unknown team."}</p>;
	}

	const teamPlayers = await getPlayersByTeams(blueTeam.id, redTeam.id);
	const blueTeamPlayers = teamPlayers.filter(
		({ teamPlayer }) => teamPlayer.teamId === blueTeam.id
	);
	const redTeamPlayers = teamPlayers.filter(
		({ teamPlayer }) => teamPlayer.teamId === redTeam.id
	);

	// Organize game data.
	const games = leftHierarchy(await getGamesByMatches(match.id), [
		"game",
		"gameResult",
		"teamGameResult",
		"playerGameResult"
	]);

	return (
		<div className={style["content"]}>
			<div className={style["team"]}>
				<header>
					<TeamCard team={blueTeam} season={season} />
					<hr />
				</header>
				<ul>
					{blueTeamPlayers.map(({ player }) => (
						<li key={player.id}>
							<PlayerCard player={player} />
						</li>
					))}
				</ul>
			</div>
			<div className={style["games"]}>
				<header>
					<h1>{`${blueTeam.name} vs ${redTeam.name}`}</h1>
					<h2>
						{season ? (
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
						) : (
							`Round ${match.round.toString()}`
						)}
						{` - ${match.format}`}
					</h2>
					<h2>{"Games"}</h2>
				</header>
				<ol>
					{games
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
							/>
						))}
				</ol>
			</div>
			<div className={style["team"]}>
				<header>
					<TeamCard team={redTeam} season={season} />
					<hr />
				</header>
				<ul>
					{redTeamPlayers.map(({ player }) => (
						<li key={player.id}>
							<PlayerCard player={player} />
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
export const generateMetadata = async (props: PageProps<MatchesPageParams>) => {
	const { slug } = await props.params;
	return {
		description: `Gauntlet Championship Series match #${slug}`,
		openGraph: { url: getMatchUrl(slug) },
		title: `Match #${slug}`
	} satisfies Metadata;
};
