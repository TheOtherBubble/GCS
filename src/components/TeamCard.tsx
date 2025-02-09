import type { seasonTable, teamTable } from "db/schema";
import Image from "./Image";
import type { JSX } from "react";
import type { LinkProps } from "./Link";
import getTeamUrl from "util/getTeamUrl";
import multiclass from "util/multiclass";
import style from "./styles/team-card.module.scss";

/**
 * Properties that can be passed to a team card.
 * @public
 */
export interface TeamCardProps extends Omit<LinkProps, "children" | "href"> {
	/** The team that is represented by the card. */
	team: typeof teamTable.$inferSelect;

	/** The season that the team participated in. */
	season?: typeof seasonTable.$inferSelect | undefined;
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
}: TeamCardProps): JSX.Element {
	return (
		<a
			className={multiclass(className, style["team-card"])}
			href={getTeamUrl(team)}
			{...props}
		>
			<Image
				alt="Logo"
				src={team.logoUrl}
				untrusted
				width={512}
				height={512}
				style={{ border: `1px solid #${team.color}` }}
			/>
			<div>
				<h3>{team.name}</h3>
				{season && <p>{`${season.name}, Pool ${team.pool.toString()}`}</p>}
			</div>
		</a>
	);
}
