import type { accountTable, gameTable, teamTable } from "db/schema";
import ImportResultsForm from "./admin/ImportResultsForm";
import { type JSX } from "react";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export interface AdminPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The game to import results for. */
	game: typeof gameTable.$inferSelect;

	/** The blue team in the game's match. */
	blueTeam?: typeof teamTable.$inferSelect | undefined;

	/** The accounts of the players on the blue team in the game's match. */
	blueAccounts?: (typeof accountTable.$inferSelect)[] | undefined;

	/** The red team in the game's match. */
	redTeam?: typeof teamTable.$inferSelect | undefined;

	/** The accounts of the players on the red team in the game's match. */
	redAccounts?: (typeof accountTable.$inferSelect)[] | undefined;
}

/**
 * A game page admin panel.
 * @param props - Properties to pass to the panel.
 * @return The panel.
 * @public
 */
export default function AdminPanel({
	game,
	blueTeam,
	blueAccounts,
	redTeam,
	redAccounts,
	...props
}: AdminPanelProps): JSX.Element {
	return (
		<div {...props}>
			<header>
				<h2>{"Admin Panel"}</h2>
			</header>
			{blueTeam && blueAccounts && redTeam && redAccounts && (
				<ImportResultsForm
					game={game}
					blueTeam={blueTeam}
					blueAccounts={blueAccounts}
					redTeam={redTeam}
					redAccounts={redAccounts}
				/>
			)}
		</div>
	);
}
