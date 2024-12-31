import { type JSX, useId } from "react";
import Form from "next/form";
import Submit from "components/Submit";
import createTeam from "db/createTeam";
import domain from "utility/domain";
import getFormField from "utility/getFormField";
import getSeasonUrl from "utility/getSeasonUrl";
import { revalidatePath } from "next/cache";
import type { seasonTable } from "db/schema";

/**
 * Properties that can be passed to a create team form.
 * @public
 */
export interface CreateTeamFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
	/** The current season. */
	season: typeof seasonTable.$inferSelect;
}

/**
 * A form for creating a team.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function CreateTeamForm({
	season,
	...props
}: CreateTeamFormProps) {
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
				await createTeam({
					code: getFormField(form, "code", true),
					color: getFormField(form, "color", true).substring(1), // Cut off pound.
					logoUrl: getFormField(form, "logoUrl", true),
					name: getFormField(form, "name", true),
					pool: parseInt(getFormField(form, "pool", true), 10),
					seasonId: season.id,
					vanityUrlSlug: getFormField(form, "vanityUrlSlug", true)
				});
				revalidatePath(getSeasonUrl(season));
			}}
			{...props}
		>
			<header>
				<h3>{"Create Team"}</h3>
			</header>
			<label htmlFor={codeId}>{"Code"}</label>
			<input type="text" id={codeId} name="code" maxLength={4} required />
			<label htmlFor={colorId}>{"Color"}</label>
			<input type="color" id={colorId} name="color" required />
			<label htmlFor={logoUrlId}>{"Logo URL"}</label>
			<input
				type="url"
				id={logoUrlId}
				name="logoUrl"
				maxLength={0x800}
				defaultValue={new URL("/default.png", domain).href}
				required
			/>
			<label htmlFor={nameId}>{"Name"}</label>
			<input type="text" id={nameId} name="name" maxLength={0x40} required />
			<label htmlFor={poolId}>{"Pool"}</label>
			<input type="number" id={poolId} name="pool" min={1} defaultValue={1} />
			<label htmlFor={vanityUrlSlugId}>{"Vanity URL slug"}</label>
			<input
				type="text"
				id={vanityUrlSlugId}
				name="vanityUrlSlug"
				maxLength={0x20}
				required
			/>
			<Submit value="Create" />
		</Form>
	);
}
