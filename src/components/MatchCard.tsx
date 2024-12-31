import Image from "./Image";
import type { JSX } from "react";
import type { Match } from "types/db/Match";
import type { Team } from "types/db/Team";
import type { TeamGameResult } from "types/db/TeamGameResult";
import getMatchUrl from "util/getMatchUrl";
import multiclass from "util/multiclass";
import style from "./styles/match-card.module.scss";

/**
 * Properties that can be passed to a match card.
 * @public
 */
export interface MatchCardProps
	extends Omit<JSX.IntrinsicElements["a"], "children" | "style" | "href"> {
	/** The match that is represented by the card. */
	match: Match;

	/** The teams in the match. */
	teams?: Team[];

	/** The game results in the match. */
	teamGameResults?: TeamGameResult[];
}

/**
 * A card that displays information about a match.
 * @param props - The properties to pass to the team card.
 * @returns The team card.
 * @public
 */
export default function MatchCard({
	match,
	teams,
	teamGameResults,
	className,
	...props
}: MatchCardProps) {
	const blueTeam = teams?.find((team) => team.id === match.blueTeamId);
	const redTeam = teams?.find((team) => team.id === match.redTeamId);
	return (
		<a
			className={multiclass(className, style["container"])}
			href={getMatchUrl(match)}
			{...props}
		>
			{blueTeam ? (
				<>
					<h3 className={style["blue"]}>{blueTeam.code}</h3>
					<Image
						alt="Logo"
						src={blueTeam.logoUrl}
						untrusted
						width={512}
						height={512}
						className={style["blue"]}
						style={{ border: `1px solid #${blueTeam.color}` }}
					/>
				</>
			) : (
				<>
					<h3 className={style["blue"]}>{"???"}</h3>
					<p className={style["blue"]}>{"Logo"}</p>
				</>
			)}
			<h2>
				{teamGameResults?.length
					? `${teamGameResults.filter((team) => team.isWinner && team.id === blueTeam?.id).length.toString()}-${teamGameResults.filter((team) => team.isWinner && team.id === redTeam?.id).length.toString()}`
					: "VS"}
			</h2>
			{redTeam ? (
				<>
					<Image
						alt="Logo"
						src={redTeam.logoUrl}
						untrusted
						width={512}
						height={512}
						className={style["red"]}
						style={{ border: `1px solid #${redTeam.color}` }}
					/>
					<h3 className={style["red"]}>{redTeam.code}</h3>
				</>
			) : (
				<>
					<p className={style["red"]}>{"Logo"}</p>
					<h3 className={style["red"]}>{"???"}</h3>
				</>
			)}
		</a>
	);
}
