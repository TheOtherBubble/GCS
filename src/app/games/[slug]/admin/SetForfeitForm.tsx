import Form, { type FormProps } from "components/Form";
import {
	gameResultTable,
	gameTable,
	matchTable,
	seasonTable,
	teamGameResultTable,
	type teamTable
} from "db/schema";
import type { JSX } from "react";
import Submit from "components/Submit";
import createForfeit from "util/createForfeit";
import db from "db/db";
import { eq } from "drizzle-orm";
import getFormField from "util/getFormField";
import hasRiotApiKey from "util/hasRiotApiKey";

/**
 * Properties that can be passed to a set forfeit form.
 * @public
 */
export interface SetForfeitFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The game to set a forfeit for. */
	game: typeof gameTable.$inferSelect;

	/** The match that the game is part of. */
	match: typeof matchTable.$inferSelect;

	/** The season that the match is part of. */
	season: typeof seasonTable.$inferSelect;

	/** The blue team in the game's match. */
	blueTeam: typeof teamTable.$inferSelect;

	/** The red team in the game's match. */
	redTeam: typeof teamTable.$inferSelect;
}

/**
 * A form for setting a forfeit for a game.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function SetForfeitForm({
	game,
	match,
	season,
	blueTeam,
	redTeam,
	...props
}: SetForfeitFormProps): JSX.Element {
	return (
		<Form
			action={async (form) => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				const [gameResult, teams] = createForfeit(
					match,
					season,
					getFormField(form, "winnerId", true) === blueTeam.id.toString()
				);
				await db
					.update(gameTable)
					.set({ tournamentCode: gameResult.tournamentCode ?? void 0 })
					.where(eq(gameTable.id, game.id));
				await db.insert(gameResultTable).values(gameResult);
				await db.insert(teamGameResultTable).values(teams);
				return void 0;
			}}
			{...props}
		>
			<header>
				<h2>{"Set Forfeit"}</h2>
				<p>{"This will overwrite this game's tournament code."}</p>
			</header>
			<p>
				<label>
					{"Winner"}
					<select name="winnerId" required>
						<option value={blueTeam.id}>{blueTeam.name}</option>
						<option value={redTeam.id}>{redTeam.name}</option>
					</select>
				</label>
			</p>
			<p>
				<Submit value="Set" />
			</p>
		</Form>
	);
}
