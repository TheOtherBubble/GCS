import type { Game } from "types/db/Game";
import GameCard from "components/GameCard";
import type { GameResult } from "types/db/GameResult";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import PlayerCard from "components/PlayerCard";
import type { PlayerGameResult } from "types/db/PlayerGameResult";
import TeamCard from "components/TeamCard";
import type { TeamGameResult } from "types/db/TeamGameResult";
import getGamesByMatch from "db/getGamesByMatch";
import { getMatchUrlBySlug } from "util/getMatchUrl";
import getPlayersByTeam from "db/getPlayersByTeam";
import getSeasonById from "db/getSeasonById";
import { getTeamsByMatchSlug } from "db/getTeamsByMatch";
import multiclass from "util/multiclass";
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
	const matchRows = await getTeamsByMatchSlug(slug);
	const match = matchRows[0]?.match;
	const season = match ? await getSeasonById(match.seasonId) : void 0;
	const blueTeam = matchRows.find(
		(row) => row.team.id === match?.blueTeamId
	)?.team;
	const redTeam = matchRows.find(
		(row) => row.team.id === match?.redTeamId
	)?.team;
	if (!match || !season || !blueTeam || !redTeam) {
		return <p>{"Unknown match."}</p>;
	}

	const blueTeamPlayers = await getPlayersByTeam(blueTeam);
	const redTeamPlayers = await getPlayersByTeam(redTeam);

	// Organize game data.
	const gameRows = await getGamesByMatch(match);
	const games: {
		game: Game;
		result: GameResult | undefined;
		teamResults: TeamGameResult[];
		playerResults: PlayerGameResult[];
	}[] = [];
	for (const row of gameRows) {
		// Insert new game.
		const game = games.find((value) => value.game.id === row.game.id);
		if (!game) {
			games.push({
				game: row.game,
				playerResults: row.playerGameResult ? [row.playerGameResult] : [],
				result: row.gameResult ?? void 0,
				teamResults: row.teamGameResult ? [row.teamGameResult] : []
			});
			continue;
		}

		// Nothing more to add if there's no team game result.
		if (!row.teamGameResult) {
			continue;
		}

		// Add a team game result to an existing game if it isn't already there.
		if (
			!game.teamResults.find(
				(teamResult) => teamResult.id === row.teamGameResult?.id
			)
		) {
			game.teamResults.push(row.teamGameResult);
		}

		// Nothing more to add if there's no player game result.
		if (!row.playerGameResult) {
			continue;
		}

		// Add a player game result to an existing game.
		game.playerResults.push(row.playerGameResult);
	}

	return (
		<div className={style["content"]}>
			<div className={multiclass(style["team"], "hide-on-mobile")}>
				<TeamCard team={blueTeam} season={season} />
				<hr />
				<div>
					{blueTeamPlayers.map(({ player }) => (
						<PlayerCard key={player.id} player={player} />
					))}
				</div>
			</div>
			<div className={style["games"]}>
				<h1 className="hide-on-desktop">{`${blueTeam.name} vs ${redTeam.name}`}</h1>
				<h2>{"Games"}</h2>
				<div>
					{games.map(({ game, result, teamResults, playerResults }) => (
						<GameCard
							key={game.id}
							game={game}
							gameResult={result}
							teamGameResults={teamResults}
							playerGameResults={playerResults}
						/>
					))}
				</div>
			</div>
			<div className={multiclass(style["team"], "hide-on-mobile")}>
				<TeamCard team={redTeam} season={season} />
				<hr />
				<div>
					{redTeamPlayers.map(({ player }) => (
						<PlayerCard key={player.id} player={player} />
					))}
				</div>
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
		openGraph: { url: getMatchUrlBySlug(slug) },
		title: `Match #${slug}`
	} satisfies Metadata;
};
