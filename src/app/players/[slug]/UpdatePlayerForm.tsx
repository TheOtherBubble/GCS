import { type JSX, useId } from "react";
import getPlayerUrl, { getPlayerUrlBySlug } from "util/getPlayerUrl";
import ChampionList from "./ChampionList";
import Form from "components/Form";
import type { Player } from "types/db/Player";
import type { PlayerRole } from "types/db/PlayerRole";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import { playerRoleEnum } from "db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import updatePlayer from "db/updatePlayer";

/**
 * Properties that can be passed to an update player form.
 * @public
 */
export interface UpdatePlayerFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
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
				const biography = getFormField(form, "biography");
				const primaryRole = getFormField(form, "primaryRole") as
					| PlayerRole
					| undefined;
				const secondaryRole = getFormField(form, "secondaryRole") as
					| PlayerRole
					| undefined;
				const backgroundChampionId = getFormField(form, "backgroundChampionId");
				await updatePlayer(player.id, {
					backgroundChampionId,
					biography,
					displayName,
					primaryRole,
					secondaryRole
				});
				if (displayName) {
					redirect(getPlayerUrlBySlug(displayName));
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
			<select
				id={primaryRoleId}
				name="primaryRole"
				defaultValue={player.primaryRole ?? void 0}
			>
				{playerRoleEnum.enumValues.map((role) => (
					<option value={role} key={role}>
						{role}
					</option>
				))}
			</select>
			<label htmlFor={secondaryRoleId}>{"Secondary role"}</label>
			<select
				id={secondaryRoleId}
				name="secondaryRole"
				defaultValue={player.secondaryRole ?? void 0}
			>
				{playerRoleEnum.enumValues.map((role) => (
					<option value={role} key={role}>
						{role}
					</option>
				))}
			</select>
			<label htmlFor={backgroundChampionIdId}>{"Background champion"}</label>
			<ChampionList
				id={backgroundChampionIdId}
				name="backgroundChampionId"
				defaultValue={player.backgroundChampionId ?? void 0}
			/>
			<input
				type="text"
				id={backgroundChampionIdId}
				name="backgroundChampionId"
				maxLength={0x20}
			/>
			<Submit value="Update" />
		</Form>
	);
}
