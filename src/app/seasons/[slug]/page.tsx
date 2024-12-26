import getSeasonUrl, { getSeasonUrlByEncodedSlug } from "utility/getSeasonUrl";
import { matchTable, teamGameResultTable, teamTable } from "db/schema";
import AdminPanel from "./AdminPanel";
import ChangeSeasonForm from "./ChangeSeasonForm";
import Link from "components/Link";
import MatchCard from "components/MatchCard";
import type { Metadata } from "next";
import type PageProps from "types/PageProps";
import { auth } from "db/auth";
import getAllSeasons from "db/getAllSeasons";
import getSeasonByEncodedSlug from "db/getSeasonByEncodedSlug";
import getTeamGameResultsBySeason from "db/getTeamGameResultsBySeason";
import getTeamUrl from "utility/getTeamUrl";
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

	// Get relevant match, game, and team data.
	const rows = await getTeamGameResultsBySeason(season);

	// Split matches into rounds for displaying.
	const rounds = new Map<
		number,
		{
			match: typeof matchTable.$inferSelect;
			teamGameResults: (typeof teamGameResultTable.$inferSelect)[];
			teams: (typeof teamTable.$inferSelect)[];
		}[]
	>(); // Round numbers to match IDs in that round.
	for (const row of rows) {
		if (!row.match) {
			continue;
		}

		// Add a match to an existing round.
		const round = rounds.get(row.match.round);
		if (round) {
			// Add data to an existing match.
			const match = round.find((value) => value.match.id === row.match?.id);
			if (match) {
				if (
					row.teamGameResult &&
					!match.teamGameResults.some(
						(teamGameResult) => teamGameResult.id === row.teamGameResult?.id
					)
				) {
					match.teamGameResults.push(row.teamGameResult);
				}

				if (!match.teams.some((team) => team.id === row.team.id)) {
					match.teams.push(row.team);
				}

				continue;
			}

			// Insert a new match.
			round.push({
				match: row.match,
				teamGameResults: row.teamGameResult ? [row.teamGameResult] : [],
				teams: [row.team]
			});
			continue;
		}

		// Insert match as the first in its round.
		rounds.set(row.match.round, [
			{
				match: row.match,
				teamGameResults: row.teamGameResult ? [row.teamGameResult] : [],
				teams: [row.team]
			}
		]);
	}

	// Sort teams by score for the leaderboard.
	const teamScores: {
		team: typeof teamTable.$inferSelect;
		wins: number;
		losses: number;
	}[] = [];
	for (const row of rows) {
		const teamScore = teamScores.find((value) => value.team.id === row.team.id);

		// If there's no game result, just create a team record with no games if the team doesn't have a record yet.
		if (!row.teamGameResult) {
			if (!teamScore) {
				teamScores.push({ losses: 0, team: row.team, wins: 0 });
			}

			continue;
		}

		// Increment wins or losses counter for existing team.
		if (teamScore) {
			if (row.teamGameResult.isWinner) {
				teamScore.wins++;
			} else {
				teamScore.losses++;
			}

			continue;
		}

		// Otherwise, create a new team record.
		teamScores.push({
			losses: row.teamGameResult.isWinner ? 0 : 1,
			team: row.team,
			wins: row.teamGameResult.isWinner ? 1 : 0
		});
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
							teams={teamScores.map((teamScore) => teamScore.team)}
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
