import Form, { type FormProps } from "components/Form";
import type { JSX } from "react";
import Submit from "components/Submit";
import db from "db/db";
import { eq } from "drizzle-orm";
import getFormField from "util/getFormField";
import getSeasonUrl from "util/getSeasonUrl";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { seasonTable } from "db/schema";

/**
 * Properties that can be passed to an update season form.
 * @public
 */
export interface UpdateSeasonFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current season. */
	season: typeof seasonTable.$inferSelect;
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
}: UpdateSeasonFormProps): JSX.Element {
	return (
		<Form
			action={async (form) => {
				"use server";
				const slug = getFormField(form, "slug");
				await db
					.update(seasonTable)
					.set({
						name: getFormField(form, "name"),
						playoffsStageId: getFormField(form, "playoffsStageId"),
						playoffsTourneyId: getFormField(form, "playoffsTourneyId"),
						slug,
						startDate: getFormField(form, "startDate")
					})
					.where(eq(seasonTable.id, season.id));
				if (slug) {
					redirect(getSeasonUrl({ slug }));
				}

				// If the vanity URL didn't change, just reload the page instead.
				revalidatePath(getSeasonUrl(season));
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
					{"Slug"}
					<input type="text" name="slug" />
				</label>
			</p>
			<p>
				<label>
					{"Toornament Tournament ID"}
					<input type="text" name="playoffsTourneyId" />
				</label>
			</p>
			<p>
				<label>
					{"Toornament Stage ID"}
					<input type="text" name="playoffsStageId" />
				</label>
			</p>
			<p>
				<Submit value="Update" />
			</p>
		</Form>
	);
}
