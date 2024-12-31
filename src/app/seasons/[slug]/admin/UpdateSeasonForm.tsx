import { type JSX, useId } from "react";
import getSeasonUrl, { getSeasonUrlByDecodedSlug } from "util/getSeasonUrl";
import Form from "components/Form";
import type { Season } from "types/db/Season";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import updateSeason from "db/updateSeason";

/**
 * Properties that can be passed to an update season form.
 * @public
 */
export interface UpdateSeasonFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
	/** The current season. */
	season: Season;
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
		<Form
			action={async (form) => {
				"use server";
				const vanityUrlSlug = getFormField(form, "vanityUrlSlug");
				await updateSeason(season.id, {
					name: getFormField(form, "name"),
					startDate: getFormField(form, "startDate"),
					vanityUrlSlug
				});
				if (vanityUrlSlug) {
					redirect(getSeasonUrlByDecodedSlug(vanityUrlSlug));
				}

				// If the vanity URL didn't change, just reload the page instead.
				revalidatePath(getSeasonUrl(season));
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
		</Form>
	);
}
