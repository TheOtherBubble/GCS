import getTeamUrl, { getTeamUrlByEncodedSlug } from "util/getTeamUrl";
import Image from "components/Image";
import Link from "components/Link";
import type { Match } from "types/db/Match";
import MatchCard from "components/MatchCard";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import PlayerCard from "components/PlayerCard";
import type { TeamGameResult } from "types/db/TeamGameResult";
import getMatchesByTeam from "db/getMatchesByTeam";
import getPlayerUrl from "util/getPlayerUrl";
import getPlayersByTeam from "db/getPlayersByTeam";
import getSeasonById from "db/getSeasonById";
import getSeasonUrl from "util/getSeasonUrl";
import getTeamByEncodedSlug from "db/getTeamByEncodedSlug";
import getTeamsBySeason from "db/getTeamsBySeason";
import style from "./page.module.scss";

/**
 * Parameters that are passed to a team page.
 * @public
 */
export interface TeamsPageParams {
	/** The team's encoded vanity URL slug. */
	slug: string;
}

/**
 * A page that displays information about a team.
 * @param props - The properties that are passed to the page.
 * @returns The team page.
 * @public
 */
export default async function Page(props: PageProps<TeamsPageParams>) {
	const { slug } = await props.params;
	const team = await getTeamByEncodedSlug(slug);
	if (!team) {
		return <p>{"Unknown team."}</p>;
	}

	const season = await getSeasonById(team.seasonId);
	const teams = season ? await getTeamsBySeason(season) : [];
	const players = await getPlayersByTeam(team);
	const captain = players.find((player) => player.teamPlayer.isCaptain)?.player;

	// Organize match data by match.
	const rows = await getMatchesByTeam(team);
	const matches = new Map<number, { match: Match; games: TeamGameResult[] }>();
	for (const row of rows) {
		// Insert a new match.
		const match = matches.get(row.match.id);
		if (!match) {
			matches.set(row.match.id, {
				games: row.teamGameResult ? [row.teamGameResult] : [],
				match: row.match
			});
			continue;
		}

		// Nothing more to add if there's no team game result.
		if (!row.teamGameResult) {
			continue;
		}

		// Add data to an existing match.
		match.games.push(row.teamGameResult);
	}

	return (
		<div className={style["content"]}>
			<header>
				<Image
					alt="Logo"
					src={team.logoUrl}
					untrusted
					width={512}
					height={512}
					style={{ border: `1px solid #${team.color}` }}
				/>
				<div>
					<h1>{`${team.code} | ${team.name}`}</h1>
					{season && (
						<p>
							<Link href={getSeasonUrl(season)}>{season.name}</Link>
							{`, Pool ${team.pool.toString()}`}
						</p>
					)}
					{captain && (
						<p>
							{"Captain: "}
							<Link href={getPlayerUrl(captain)}>
								{captain.displayName ?? captain.name}
							</Link>
						</p>
					)}
				</div>
			</header>
			<div>
				<div>
					<header>
						<h2>{"Players"}</h2>
					</header>
					{players.map(({ player }) => (
						<PlayerCard key={player.id} player={player} />
					))}
				</div>
				<div>
					<header>
						<h2>{"Match History"}</h2>
					</header>
					{Array.from(matches).map(([, { games, match }]) => (
						<MatchCard
							key={match.id}
							match={match}
							season={season}
							teams={teams}
							teamGameResults={games}
							dateTimeFormatOptions={{
								dateStyle: "long",
								timeStyle: "short"
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

/**
 * The team page's metadata.
 * @param props - The properties that are passed to the page.
 * @returns The metadata.
 * @public
 */
export const generateMetadata = async (props: PageProps<TeamsPageParams>) => {
	const { slug } = await props.params;
	const team = await getTeamByEncodedSlug(slug);
	return (
		team
			? {
					description: `Gauntlet Championship Series team "${team.name}."`,
					openGraph: { images: team.logoUrl, url: getTeamUrl(team) },
					title: team.name
				}
			: {
					description: "An unknown team in the Gauntlet Championship Series.",
					openGraph: { url: getTeamUrlByEncodedSlug(slug) },
					title: "Unknown Team"
				}
	) satisfies Metadata;
};
