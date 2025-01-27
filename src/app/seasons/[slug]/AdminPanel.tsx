import type { seasonTable, teamTable } from "db/schema";
import CreateMatchForm from "./admin/CreateMatchForm";
import CreateTeamForm from "./admin/CreateTeamForm";
import DeleteSeasonForm from "./admin/DeleteSeasonForm";
import GenerateRegularSeasonForm from "./admin/GenerateRegularSeasonForm";
import { type JSX } from "react";
import UpdateSeasonForm from "./admin/UpdateSeasonForm";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export interface AdminPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The current season. */
	season: typeof seasonTable.$inferSelect;

	/** A list of all teams in the current season. */
	teams: (typeof teamTable.$inferSelect)[];
}

/**
 * A season page admin panel.
 * @param props - Properties to pass to the panel.
 * @return The panel.
 * @public
 */
export default function AdminPanel({
	season,
	teams,
	...props
}: AdminPanelProps): JSX.Element {
	return (
		<div {...props}>
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
