import type { seasonsTable, teamsTable } from "db/schema";
import CreateMatchForm from "./admin/CreateMatchForm";
import CreateTeamForm from "./admin/CreateTeamForm";
import DeleteSeasonForm from "./admin/DeleteSeasonForm";
import { type JSX } from "react";
import SeedSeasonForm from "./admin/SeedSeasonForm";
import UpdateSeasonForm from "./admin/UpdateSeasonForm";
import multiclass from "utility/multiclass";
import style from "./admin/admin-panel.module.scss";

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
