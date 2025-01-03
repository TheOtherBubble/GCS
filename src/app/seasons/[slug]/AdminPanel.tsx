import CreateMatchForm from "./admin/CreateMatchForm";
import CreateTeamForm from "./admin/CreateTeamForm";
import DeleteSeasonForm from "./admin/DeleteSeasonForm";
import GenerateRegularSeasonForm from "./admin/GenerateRegularSeasonForm";
import { type JSX } from "react";
import type { Season } from "types/db/Season";
import type { Team } from "types/db/Team";
import UpdateSeasonForm from "./admin/UpdateSeasonForm";
import multiclass from "util/multiclass";
import style from "styles/blob.module.scss";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export type AdminPanelProps = JSX.IntrinsicElements["div"] & {
	/** The current season. */
	season: Season;

	/** A list of all teams in the current season. */
	teams: Team[];
};

/**
 * A season page admin panel.
 * @param props - Properties to pass to the panel.
 * @returns The panel.
 * @public
 */
export default function AdminPanel({
	season,
	teams,
	className,
	...props
}: AdminPanelProps) {
	return (
		<div className={multiclass(style["blob-section"], className)} {...props}>
			<header>
				<h2>{"Admin Panel"}</h2>
			</header>
			<UpdateSeasonForm season={season} />
			<DeleteSeasonForm season={season} />
			<CreateTeamForm season={season} />
			<CreateMatchForm season={season} teams={teams} />
			<GenerateRegularSeasonForm season={season} teams={teams} />
		</div>
	);
}
