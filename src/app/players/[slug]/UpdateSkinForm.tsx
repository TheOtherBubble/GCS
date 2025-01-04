import Form from "components/Form";
import type { FormProps } from "next/form";
import type { Player } from "types/db/Player";
import SkinList from "./SkinList";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import getPlayerUrl from "util/getPlayerUrl";
import { revalidatePath } from "next/cache";
import updatePlayer from "db/updatePlayer";
import { useId } from "react";

/**
 * Properties that can be passed to an update skin form.
 * @public
 */
export interface UpdateSkinFormProps extends Omit<FormProps, "action"> {
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

				await updatePlayer(player.id, {
					backgroundSkinNumber: parseInt(
						getFormField(form, "backgroundSkinNumber", true),
						10
					)
				});
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
				required
			/>
			<Submit value="Update" />
		</Form>
	);
}
