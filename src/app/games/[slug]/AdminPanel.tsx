import type {
	accountTable,
	gameTable,
	matchTable,
	seasonTable,
	teamTable
} from "db/schema";
import ImportResultsForm from "./admin/ImportResultsForm";
import { type JSX } from "react";
import SetForfeitForm from "./admin/SetForfeitForm";

/**
 * Properties that can be passed to an admin panel.
 * @public
 */
export interface AdminPanelProps
	extends Omit<JSX.IntrinsicElements["div"], "children"> {
	/** The game to import results for. */
	game: typeof gameTable.$inferSelect;

	/** The match that the game is part of. */
	match?: typeof matchTable.$inferSelect | undefined;

	/** The season that the match is part of. */
	season?: typeof seasonTable.$inferSelect | undefined;

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
	match,
	season,
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
			{match && season && blueTeam && redTeam && (
				<SetForfeitForm
					game={game}
					match={match}
					season={season}
					blueTeam={blueTeam}
					redTeam={redTeam}
				/>
			)}
		</div>
	);
}
