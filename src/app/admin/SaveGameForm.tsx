import Form, { type FormProps } from "components/Form";
import {
	accountTable,
	playerTable,
	teamPlayerTable,
	teamTable
} from "db/schema";
import type { JSX } from "react";
import Submit from "components/Submit";
import db from "db/db";
import { eq } from "drizzle-orm";
import getFormField from "util/getFormField";
import hasRiotApiKey from "util/hasRiotApiKey";
import leftHierarchy from "util/leftHierarchy";
import saveGame from "util/saveGame";

/**
 * Properties that can be passed to a save game form.
 * @public
 */
export type SaveGameFormProps = Omit<FormProps, "action" | "children">;

/**
 * A form for saving a game to the database.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function SaveGameForm(props: SaveGameFormProps): JSX.Element {
	return (
		<Form
			action={async (form) => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				await saveGame(
					getFormField(form, "gameId", true) as `${number}`,
					leftHierarchy(
						await db
							.select()
							.from(teamTable)
							.leftJoin(
								teamPlayerTable,
								eq(teamTable.id, teamPlayerTable.teamId)
							)
							.leftJoin(
								playerTable,
								eq(teamPlayerTable.playerId, playerTable.id)
							)
							.leftJoin(
								accountTable,
								eq(playerTable.id, accountTable.playerId)
							),
						"team",
						"account"
					).reduce((previousValue, currentValue) => {
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
