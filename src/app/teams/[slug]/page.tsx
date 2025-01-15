import AdminPanel from "./AdminPanel";
import Image from "components/Image";
import Link from "components/Link";
import MatchCard from "components/MatchCard";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import PlayerCard from "components/PlayerCard";
import { auth } from "db/auth";
import getMatchesByTeams from "db/getMatchesByTeams";
import getPlayerUrl from "util/getPlayerUrl";
import getPlayersByTeams from "db/getPlayersByTeams";
import getSeasonUrl from "util/getSeasonUrl";
import getSeasons from "db/getSeasons";
import getTeamBySlug from "db/getTeamBySlug";
import getTeamUrl from "util/getTeamUrl";
import getTeamsBySeasons from "db/getTeamsBySeasons";
import leftHierarchy from "util/leftHierarchy";
import { redirect } from "next/navigation";
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
	const team = await getTeamBySlug(slug);
	if (!team) {
		redirect("/teams");
	}

	const session = await auth();
	const [season] = await getSeasons(team.seasonId);
	const teams = season ? await getTeamsBySeasons(season.id) : [];
	const players = await getPlayersByTeams(team.id);
	const captain = players.find((player) => player.teamPlayer.isCaptain)?.player;

	// Organize match data by match.
	const matches = leftHierarchy(await getMatchesByTeams(team.id), [
		"match",
		"game",
		"gameResult",
		"teamGameResult"
	]);

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
							<Link
								href={getSeasonUrl(encodeURIComponent(season.vanityUrlSlug))}
							>
								{season.name}
							</Link>
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
					<div>
						<header>
							<h2>{"Players"}</h2>
						</header>
						<ul>
							{players.map(({ player }) => (
								<li key={player.id}>
									<PlayerCard player={player} />
								</li>
							))}
						</ul>
					</div>
					{session?.user?.isAdministator && (
						<AdminPanel team={team} className={style["admin"]} />
					)}
				</div>
				<div>
					<div>
						<header>
							<h2>{"Match History"}</h2>
						</header>
						<ol>
							{Array.from(matches)
								.sort(
									(
										{ value: { round: a, timeSlot: c, id: e } },
										{ value: { round: b, timeSlot: d, id: f } }
									) => a - b || c - d || e - f
								)
								.map(({ children: games, value: match }) => (
									<li key={match.id}>
										<MatchCard
											match={match}
											season={season}
											teams={teams}
											teamGameResults={games
												.flatMap(({ children }) => children)
												.flatMap(({ children }) => children)}
											dateTimeFormatOptions={{
												dateStyle: "long",
												timeStyle: "short"
											}}
										/>
									</li>
								))}
						</ol>
					</div>
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
	const team = await getTeamBySlug(slug);
	return (
		team
			? {
					description: `Gauntlet Championship Series team "${team.name}."`,
					openGraph: {
						images: team.logoUrl,
						url: getTeamUrl(encodeURIComponent(team.vanityUrlSlug))
					},
					title: team.name
				}
			: {
					description: "An unknown team in the Gauntlet Championship Series.",
					openGraph: { url: getTeamUrl(slug) },
					title: "Unknown Team"
				}
	) satisfies Metadata;
};
