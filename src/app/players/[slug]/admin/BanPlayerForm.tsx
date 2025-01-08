import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import updatePlayer from "db/updatePlayer";
import { useId } from "react";

/**
 * Properties that can be passed to a ban player form.
 * @public
 */
export interface BanPlayerFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The player to ban. */
	player: Player;
}

/**
 * A form for banning a player.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function BanPlayerForm({
	player,
	...props
}: BanPlayerFormProps) {
	const bannedUntilDateId = useId();

	return (
		<Form
			action={async (form) => {
				"use server";
				await updatePlayer(player.id, {
					bannedUntilDate: getFormField(
						form,
						"bannedUntilDate",
						true
					).substring(0, 10)
				});
			}}
			{...props}
		>
			<header>
				<h2>{"Ban Player"}</h2>
				<p>{"Set this to a date in the past to unban this player."}</p>
			</header>
			<label htmlFor={bannedUntilDateId}>{"Banned until"}</label>
			<input
				type="date"
				id={bannedUntilDateId}
				name="bannedUntilDate"
				required
			/>
			<Submit value="Ban" />
		</Form>
	);
}
