import Form, { type FormProps } from "components/Form";
import type { Season } from "types/db/Season";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import getSeasonUrl from "util/getSeasonUrl";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import updateSeasons from "db/updateSeasons";

/**
 * Properties that can be passed to an update season form.
 * @public
 */
export interface UpdateSeasonFormProps
	extends Omit<FormProps, "action" | "children"> {
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
	return (
		<Form
			action={async (form) => {
				"use server";
				const vanityUrlSlug = getFormField(form, "vanityUrlSlug");
				await updateSeasons(
					{
						name: getFormField(form, "name"),
						startDate: getFormField(form, "startDate"),
						vanityUrlSlug
					},
					season.id
				);
				if (vanityUrlSlug) {
					redirect(getSeasonUrl(encodeURIComponent(vanityUrlSlug)));
				}

				// If the vanity URL didn't change, just reload the page instead.
				revalidatePath(getSeasonUrl(encodeURIComponent(season.vanityUrlSlug)));
			}}
			{...props}
		>
			<header>
				<h3>{"Update Season"}</h3>
			</header>
			<p>
				<label>
					{"Start date"}
					<input type="date" name="startDate" />
				</label>
			</p>
			<p>
				<label>
					{"Name"}
					<input type="text" name="name" />
				</label>
			</p>
			<p>
				<label>
					{"Vanity URL slug"}
					<input type="text" name="vanityUrlSlug" />
				</label>
			</p>
			<p>
				<Submit value="Update" />
			</p>
		</Form>
	);
}
