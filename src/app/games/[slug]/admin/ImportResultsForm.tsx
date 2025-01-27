import Form, { type FormProps } from "components/Form";
import {
	type accountTable,
	gameResultTable,
	gameTable,
	playerGameResultTable,
	teamGameResultBanTable,
	teamGameResultTable,
	type teamTable
} from "db/schema";
import type { JSX } from "react";
import Submit from "components/Submit";
import convertResult from "util/convertResult";
import db from "db/db";
import { eq } from "drizzle-orm";
import getFormField from "util/getFormField";
import getMatchDto from "riot/getMatchDto";
import hasRiotApiKey from "util/hasRiotApiKey";
import makeMatchId from "util/makeMatchId";

/**
 * Properties that can be passed to an import results form.
 * @public
 */
export interface ImportResultsFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The game to import results for. */
	game: typeof gameTable.$inferSelect;

	/** The blue team in the game's match. */
	blueTeam: typeof teamTable.$inferSelect;

	/** The accounts of the players on the blue team in the game's match. */
	blueAccounts: (typeof accountTable.$inferSelect)[];

	/** The red team in the game's match. */
	redTeam: typeof teamTable.$inferSelect;

	/** The accounts of the players on the red team in the game's match. */
	redAccounts: (typeof accountTable.$inferSelect)[];
}

/**
 * A form for importing game results to the database.
 * @param props - Properties to pass to the form.
 * @return The form.
 * @public
 */
export default function ImportResultsForm({
	game,
	blueTeam,
	blueAccounts,
	redTeam,
	redAccounts,
	...props
}: ImportResultsFormProps): JSX.Element {
	const puuids = new Map([
		[blueTeam.id, blueAccounts.map(({ puuid }) => puuid)],
		[redTeam.id, redAccounts.map(({ puuid }) => puuid)]
	]);

	return (
		<Form
			action={async (form) => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				const [gameResult, teams, bans, players] = convertResult(
					await getMatchDto(
						makeMatchId(getFormField(form, "gameId", true) as `${number}`)
					),
					puuids
				);
				await db
					.update(gameTable)
					.set({ tournamentCode: gameResult.tournamentCode ?? void 0 })
					.where(eq(gameTable.id, game.id));
				await db.insert(gameResultTable).values(gameResult);
				await db.insert(teamGameResultTable).values(teams);
				await db.insert(teamGameResultBanTable).values(bans);
				await db.insert(playerGameResultTable).values(players);
				return void 0;
			}}
			{...props}
		>
			<header>
				<h2>{"Import Results"}</h2>
				<p>
					{
						"This will overwrite this game's tournament code if the imported game results to not match."
					}
				</p>
			</header>
			<p>
				<label>
					{"Game ID"}
					<input type="number" name="gameId" required />
				</label>
			</p>
			<p>
				<Submit value="Import" />
			</p>
		</Form>
	);
}
