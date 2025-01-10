import Form, { type FormProps } from "components/Form";
import type { Player } from "types/db/Player";
import SkinList from "./SkinList";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import getPlayerUrl from "util/getPlayerUrl";
import { revalidatePath } from "next/cache";
import updatePlayers from "db/updatePlayers";
import { useId } from "react";

/**
 * Properties that can be passed to an update skin form.
 * @public
 */
export interface UpdateSkinFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current player. */
	player: Player;

	/** The current player's current background champion ID. */
	backgroundChampionId: string;
}

/**
 * A form for updating a skin.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdateSkinForm({
	player,
	backgroundChampionId,
	...props
}: UpdateSkinFormProps) {
	const backgroundSkinNumberId = useId();

	return (
		<Form
			action={async (form) => {
				"use server";
				const backgroundSkinNumber = parseInt(
					getFormField(form, "backgroundSkinNumber", true),
					10
				);
				if (backgroundSkinNumber === player.backgroundSkinNumber) {
					return;
				}

				await updatePlayers({ backgroundSkinNumber }, player.id);
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h3>{"Update Background Skin"}</h3>
			</header>
			<label htmlFor={backgroundSkinNumberId}>{"Background skin"}</label>
			<SkinList
				championId={backgroundChampionId}
				id={backgroundSkinNumberId}
				name="backgroundSkinNumber"
				defaultValue={player.backgroundSkinNumber ?? 0}
				required
			/>
			<Submit value="Update" />
		</Form>
	);
}
