import { type JSX, useId } from "react";
import Submit from "components/Submit";
import getFormField from "scripts/getFormField";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { seasonsTable } from "scripts/schema";
import updateSeason from "scripts/updateSeason";

/**
 * Properties that can be passed to an update season form.
 * @public
 */
export interface UpdateSeasonFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
	/** The current season. */
	season: typeof seasonsTable.$inferSelect;
}

/**
 * A form for updating a season.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdateSeasonForm({
	season,
	...props
}: UpdateSeasonFormProps) {
	const startDateId = useId();
	const nameId = useId();
	const vanityUrlSlugId = useId();

	return (
		<form
			action={async (form) => {
				"use server";
				const vanityUrlSlug = getFormField(form, "vanityUrlSlug");
				await updateSeason(season.id, {
					name: getFormField(form, "name"),
					startDate: getFormField(form, "startDate"),
					vanityUrlSlug
				});
				if (vanityUrlSlug) {
					redirect(`/seasons/${encodeURIComponent(vanityUrlSlug)}`);
				}

				// If the vanity URL didn't change, just reload the page instead.
				revalidatePath(`/seasons/${encodeURIComponent(season.vanityUrlSlug)}`);
			}}
			{...props}
		>
			<header>
				<h3>{"Update Season"}</h3>
			</header>
			<label htmlFor={startDateId}>{"Start date"}</label>
			<input type="date" id={startDateId} name="startDate" />
			<label htmlFor={nameId}>{"Name"}</label>
			<input type="text" id={nameId} name="name" />
			<label htmlFor={vanityUrlSlugId}>{"Vanity URL slug"}</label>
			<input type="text" id={vanityUrlSlugId} name="vanityUrlSlug" />
			<Submit value="Update" />
		</form>
	);
}
