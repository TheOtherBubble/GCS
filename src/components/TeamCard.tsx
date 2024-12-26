import type { seasonsTable, teamsTable } from "db/schema";
import Image from "./Image";
import type { JSX } from "react";
import getTeamUrl from "utility/getTeamUrl";
import multiclass from "utility/multiclass";
import style from "./styles/team-card.module.scss";

/**
 * Properties that can be passed to a team card.
 * @public
 */
export interface TeamCardProps
	extends Omit<JSX.IntrinsicElements["a"], "children" | "style" | "href"> {
	/** The team that is represented by the card. */
	team: typeof teamsTable.$inferSelect;

	/** The season that the team participated in. */
	season?: typeof seasonsTable.$inferSelect | undefined;
}

/**
 * A card that displays information about a team.
 * @param props - The properties to pass to the team card.
 * @returns The team card.
 * @public
 */
export default function TeamCard({
	team,
	season,
	className,
	...props
}: TeamCardProps) {
	return (
		<a
			className={multiclass(className, style["container"])}
			href={getTeamUrl(team)}
			{...props}
		>
			<Image
				alt="Logo"
				src={team.logoUrl}
				untrusted
				width={512}
				height={512}
				className={style["logo"]}
				style={{ border: `1px solid #${team.color}` }}
			/>
			<div className={style["text"]}>
				<h3>{team.name}</h3>
				{season && (
					<p>
						{season.name}
						{", Pool "}
						{team.pool}
					</p>
				)}
			</div>
		</a>
	);
}
