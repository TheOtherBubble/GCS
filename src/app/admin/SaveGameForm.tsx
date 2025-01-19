import Form, { type FormProps } from "components/Form";
import Submit from "components/Submit";
import convertResult from "util/convertResult";
import createGameResults from "db/createGameResults";
import createPlayerGameResults from "db/createPlayerGameResults";
import createTeamGameResultBans from "db/createTeamGameResultBans";
import createTeamGameResults from "db/createTeamGameResults";
import getAllTeamsWithAccounts from "db/getAllTeamsWithAccounts";
import getFormField from "util/getFormField";
import getMatchDtoByGameId from "util/getMatchDtoByGameId";
import hasRiotApiKey from "util/hasRiotApiKey";
import leftHierarchy from "util/leftHierarchy";

/**
 * Properties that can be passed to a save game form.
 * @public
 */
export type SaveGameForm = Omit<FormProps, "action" | "children">;

/**
 * A form for saving a game to the database.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function SaveGameForm(props: SaveGameForm) {
	return (
		<Form
			action={async (form) => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				const [game, teams, bans, players] = convertResult(
					await getMatchDtoByGameId(
						parseInt(getFormField(form, "gameId", true), 10)
					),
					leftHierarchy(await getAllTeamsWithAccounts(), [
						"team",
						"account"
					]).reduce((previousValue, currentValue) => {
						let team = previousValue.get(currentValue.value.id);
						if (!team) {
							team = [];
							previousValue.set(currentValue.value.id, team);
						}

						for (const account of currentValue.children) {
							team.push(account.puuid);
						}

						return previousValue;
					}, new Map<number, string[]>())
				);
				await createGameResults(game);
				await createTeamGameResults(...teams);
				await createTeamGameResultBans(...bans);
				await createPlayerGameResults(...players);
				return void 0;
			}}
			{...props}
		>
			<header>
				<h2>{"Save Game"}</h2>
			</header>
			<p>
				<label>
					{"Game ID"}
					<input type="number" name="gameId" required />
				</label>
			</p>
			<p>
				<Submit value="Save" />
			</p>
		</Form>
	);
}
