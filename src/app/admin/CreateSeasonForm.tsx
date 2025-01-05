import Form, { type FormProps } from "components/Form";
import Submit from "components/Submit";
import createSeason from "db/createSeason";
import getFormField from "util/getFormField";
import makeTournament from "riot/makeTournament";
import { useId } from "react";

/**
 * Properties that can be passed to a create season form.
 * @public
 */
export type CreateSeasonFormProps = Omit<FormProps, "action">;

/**
 * A form for creating a season.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function CreateSeasonForm(props: CreateSeasonFormProps) {
	const startDateId = useId();
	const nameId = useId();
	const vanityUrlSlugId = useId();

	return (
		<Form
			action={async (form) => {
				"use server";
				const name = getFormField(form, "name", true);
				await createSeason({
					id: await makeTournament(name),
					name,
					startDate: getFormField(form, "startDate"),
					vanityUrlSlug: getFormField(form, "vanityUrlSlug", true)
				});
			}}
			{...props}
		>
			<header>
				<h2>{"Create Season"}</h2>
			</header>
			<label htmlFor={startDateId}>{"Start date"}</label>
			<input type="date" id={startDateId} name="startDate" />
			<label htmlFor={nameId}>{"Name"}</label>
			<input type="text" id={nameId} name="name" maxLength={0x40} required />
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
