import Form, { type FormProps } from "components/Form";
import type { Account } from "types/db/Account";
import type { Game } from "types/db/Game";
import Submit from "components/Submit";
import type { Team } from "types/db/Team";
import convertResult from "util/convertResult";
import createGameResults from "db/createGameResults";
import createPlayerGameResults from "db/createPlayerGameResults";
import createTeamGameResultBans from "db/createTeamGameResultBans";
import createTeamGameResults from "db/createTeamGameResults";
import getFormField from "util/getFormField";
import getMatchDtoByGameId from "util/getMatchDtoByGameId";
import hasRiotApiKey from "util/hasRiotApiKey";
import updateGames from "db/updateGames";

/**
 * Properties that can be passed to an import results form.
 * @public
 */
export interface ImportResultsFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The game to import results for. */
	game: Game;

	/** The blue team in the game's match. */
	blueTeam: Team;

	/** The accounts of the players on the blue team in the game's match. */
	blueAccounts: Account[];

	/** The red team in the game's match. */
	redTeam: Team;

	/** The accounts of the players on the red team in the game's match. */
	redAccounts: Account[];
}

/**
 * A form for importing game results to the database.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function ImportResultsForm({
	game,
	blueTeam,
	blueAccounts,
	redTeam,
	redAccounts,
	...props
}: ImportResultsFormProps) {
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
					await getMatchDtoByGameId(
						parseInt(getFormField(form, "gameId", true), 10)
					),
					puuids
				);
				await updateGames(
					{ tournamentCode: gameResult.tournamentCode ?? void 0 },
					game.id
				);
				await createGameResults(gameResult);
				await createTeamGameResults(...teams);
				await createTeamGameResultBans(...bans);
				await createPlayerGameResults(...players);
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
