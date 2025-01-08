import Form, { type FormProps } from "components/Form";
import type { Season } from "types/db/Season";
import Submit from "components/Submit";
import getFormField from "util/getFormField";
import { getSeasonUrlByDecodedSlug } from "util/getSeasonUrl";
import { redirect } from "next/navigation";
import { useId } from "react";

/**
 * Properties that can be passed to a change season form.
 * @public
 */
export interface ChangeSeasonFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current season. */
	season: Season | undefined;

	/** A list of all seasons. */
	seasons: Season[];
}

/**
 * A form for changing the current season.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function ChangeSeasonForm({
	season,
	seasons,
	...props
}: ChangeSeasonFormProps) {
	const vanityUrlSlugId = useId();

	return (
		<Form
			// Server actions must be asynchronous.
			// eslint-disable-next-line @typescript-eslint/require-await
			action={async (form) => {
				"use server";
				const vanityUrlSlug = getFormField(form, "vanityUrlSlug", true);
				if (season?.vanityUrlSlug === vanityUrlSlug) {
					return;
				}

				redirect(getSeasonUrlByDecodedSlug(vanityUrlSlug));
			}}
			{...props}
		>
			<label htmlFor={vanityUrlSlugId}>{"Change season"}</label>
			<select
				id={vanityUrlSlugId}
				name="vanityUrlSlug"
				defaultValue={season?.vanityUrlSlug}
				required
			>
				{seasons.map((value) => (
					<option value={value.vanityUrlSlug} key={value.id}>
						{value.name}
					</option>
				))}
			</select>
			<Submit value="Go" />
		</Form>
	);
}
