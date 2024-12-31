import type { seasonTable, teamTable } from "db/schema";
import CreateMatchForm from "./admin/CreateMatchForm";
import CreateTeamForm from "./admin/CreateTeamForm";
import DeleteSeasonForm from "./admin/DeleteSeasonForm";
import GenerateRegularSeasonForm from "./admin/GenerateRegularSeasonForm";
import { type JSX } from "react";
import UpdateSeasonForm from "./admin/UpdateSeasonForm";
import multiclass from "util/multiclass";
import style from "./admin/admin-panel.module.scss";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export type AdminPanelProps = JSX.IntrinsicElements["div"] & {
	/** The current season. */
	season: typeof seasonTable.$inferSelect;

	/** A list of all teams in the current season. */
	teams: (typeof teamTable.$inferSelect)[];
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
			<GenerateRegularSeasonForm season={season} teams={teams} />
		</div>
	);
}
