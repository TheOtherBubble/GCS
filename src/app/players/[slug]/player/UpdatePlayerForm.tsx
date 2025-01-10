import Form, { type FormProps } from "components/Form";
import ChampionList from "./ChampionList";
import type { Player } from "types/db/Player";
import type { PlayerRole } from "types/db/PlayerRole";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import getPlayerUrl from "util/getPlayerUrl";
import getPlayerUrlBySlug from "util/getPlayerUrlBySlug";
import { playerRoleEnum } from "db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import updatePlayers from "db/updatePlayers";
import { useId } from "react";

/**
 * Properties that can be passed to an update player form.
 * @public
 */
export interface UpdatePlayerFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current player. */
	player: Player;
}

/**
 * A form for updating a player.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdatePlayerForm({
	player,
	...props
}: UpdatePlayerFormProps) {
	const backgroundChampionIdId = useId();
	const biographyId = useId();
	const displayNameId = useId();
	const primaryRoleId = useId();
	const secondaryRoleId = useId();

	return (
		<Form
			action={async (form) => {
				"use server";
				const displayName = getFormField(form, "displayName");
				const backgroundChampionId = getFormField(form, "backgroundChampionId");
				await updatePlayers(
					{
						backgroundChampionId,
						backgroundSkinNumber: backgroundChampionId ? 0 : void 0,
						biography: getFormField(form, "biography"),
						displayName,
						primaryRole: getFormField(form, "primaryRole") as
							| PlayerRole
							| undefined,
						secondaryRole: getFormField(form, "secondaryRole") as
							| PlayerRole
							| undefined
					},
					player.id
				);
				if (displayName) {
					redirect(getPlayerUrlBySlug(encodeURIComponent(displayName)));
				}

				// If the vanity URL didn't change, just reload the page instead.
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h3>{"Update Player"}</h3>
			</header>
			<label htmlFor={displayNameId}>{"Display name"}</label>
			<input
				type="text"
				id={displayNameId}
				name="displayName"
				maxLength={0x20}
			/>
			<label htmlFor={biographyId}>{"Biography"}</label>
			<textarea id={biographyId} name="biography" maxLength={0x100} />
			<label htmlFor={primaryRoleId}>{"Primary role"}</label>
			<select id={primaryRoleId} name="primaryRole">
				<option />
				{playerRoleEnum.enumValues.map((role) => (
					<option value={role} key={role}>
						{role}
					</option>
				))}
			</select>
			<label htmlFor={secondaryRoleId}>{"Secondary role"}</label>
			<select id={secondaryRoleId} name="secondaryRole">
				<option />
				{playerRoleEnum.enumValues.map((role) => (
					<option value={role} key={role}>
						{role}
					</option>
				))}
			</select>
			<label htmlFor={backgroundChampionIdId}>{"Background champion"}</label>
			<ChampionList id={backgroundChampionIdId} name="backgroundChampionId" />
			<Submit value="Update" />
		</Form>
	);
}
