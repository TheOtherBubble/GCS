import type { seasonsTable, teamsTable } from "../../../../scripts/schema";
import CreateMatchForm from "./CreateMatchForm";
import CreateTeamForm from "./CreateTeamForm";
import DeleteSeasonForm from "./DeleteSeasonForm";
import { type JSX } from "react";
import SeedSeasonForm from "./SeedSeasonForm";
import UpdateSeasonForm from "./UpdateSeasonForm";
import multiclass from "../../../../scripts/multiclass";
import style from "./admin-panel.module.scss";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export type AdminPanelProps = JSX.IntrinsicElements["div"] & {
	/** The current season. */
	season: typeof seasonsTable.$inferSelect;

	/** A list of all teams in the current season. */
	teams: (typeof teamsTable.$inferSelect)[];
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
		<div className={multiclass(style["admin"], className)} {...props}>
			<h2>{"Admin Panel"}</h2>
			<UpdateSeasonForm season={season} />
			<DeleteSeasonForm season={season} />
			<CreateTeamForm season={season} />
			<CreateMatchForm season={season} teams={teams} />
			<SeedSeasonForm season={season} teams={teams} />
		</div>
	);
}
