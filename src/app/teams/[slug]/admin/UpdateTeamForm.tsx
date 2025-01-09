import Form, { type FormProps } from "components/Form";
import getTeamUrl, { getTeamUrlByDecodedSlug } from "util/getTeamUrl";
import Submit from "components/Submit";
import type { Team } from "types/db/Team";
import getFormField from "util/getFormField";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import updateTeam from "db/updateTeam";
import { useId } from "react";

/**
 * Properties that can be passed to a create team form.
 * @public
 */
export interface UpdateTeamFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The team to modify. */
	team: Team;
}

/**
 * A form for updating a team.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdateTeamForm({
	team,
	...props
}: UpdateTeamFormProps) {
	const codeId = useId();
	const colorId = useId();
	const logoUrlId = useId();
	const nameId = useId();
	const poolId = useId();
	const vanityUrlSlugId = useId();

	return (
		<Form
			action={async (form) => {
				"use server";
				const vanityUrlSlug = getFormField(form, "vanityUrlSlug");
				const poolString = getFormField(form, "pool");
				await updateTeam(team.id, {
					code: getFormField(form, "code"),
					color: getFormField(form, "color")?.substring(1), // Cut off pound.
					logoUrl: getFormField(form, "logoUrl"),
					name: getFormField(form, "name"),
					pool: poolString ? parseInt(poolString, 10) : void 0,
					vanityUrlSlug
				});
				if (vanityUrlSlug) {
					redirect(getTeamUrlByDecodedSlug(vanityUrlSlug));
				}

				// If the vanity URL didn't change, just reload the page instead.
				revalidatePath(getTeamUrl(team));
			}}
			{...props}
		>
			<header>
				<h3>{"Update Team"}</h3>
			</header>
			<label htmlFor={codeId}>{"Code"}</label>
			<input type="text" id={codeId} name="code" maxLength={4} />
			<label htmlFor={colorId}>{"Color"}</label>
			<input
				type="color"
				id={colorId}
				name="color"
				defaultValue={`#${team.color}`}
			/>
			<label htmlFor={logoUrlId}>{"Logo URL"}</label>
			<input type="url" id={logoUrlId} name="logoUrl" maxLength={0x800} />
			<label htmlFor={nameId}>{"Name"}</label>
			<input type="text" id={nameId} name="name" maxLength={0x40} />
			<label htmlFor={poolId}>{"Pool"}</label>
			<input type="number" id={poolId} name="pool" min={1} />
			<label htmlFor={vanityUrlSlugId}>{"Vanity URL slug"}</label>
			<input
				type="text"
				id={vanityUrlSlugId}
				name="vanityUrlSlug"
				maxLength={0x20}
			/>
			<Submit value="Update" />
		</Form>
	);
}
