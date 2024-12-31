import { type JSX, useId } from "react";
import Form from "components/Form";
import type { MatchFormat } from "types/db/MatchFormat";
import type { Season } from "types/db/Season";
import Submit from "components/Submit";
import type { Team } from "types/db/Team";
import createMatch from "db/createMatch";
import getFormField from "util/getFormField";
import getSeasonUrl from "util/getSeasonUrl";
import { matchFormatEnum } from "db/schema";
import { revalidatePath } from "next/cache";

/**
 * Properties that can be passed to a create match form.
 * @public
 */
export interface CreateMatchFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
	/** The current season. */
	season: Season;

	/** The teams in the current season. */
	teams: Team[];
}

/**
 * A form for creating a match.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function CreateMatchForm({
	season,
	teams,
	...props
}: CreateMatchFormProps) {
	const blueTeamIdId = useId();
	const formatId = useId();
	const redTeamIdId = useId();
	const roundId = useId();

	return (
		<Form
			action={async (form) => {
				"use server";
				await createMatch({
					blueTeamId: parseInt(getFormField(form, "blueTeamId", true), 10),
					format: getFormField(form, "format", true) as MatchFormat,
					redTeamId: parseInt(getFormField(form, "redTeamId", true), 10),
					round: parseInt(getFormField(form, "round", true), 10),
					seasonId: season.id
				});
				revalidatePath(getSeasonUrl(season));
			}}
			{...props}
		>
			<header>
				<h3>{"Create Match"}</h3>
			</header>
			<label htmlFor={blueTeamIdId}>{"Blue team"}</label>
			<select id={blueTeamIdId} name={"blueTeamId"} required>
				{teams.map((team) => (
					<option value={team.id} key={team.id}>
						{team.name}
					</option>
				))}
			</select>
			<label htmlFor={formatId}>{"Format"}</label>
			<select id={formatId} name={"format"} defaultValue={"Best of 3"} required>
				{matchFormatEnum.enumValues.map((format) => (
					<option value={format} key={format}>
						{format}
					</option>
				))}
			</select>
			<label htmlFor={redTeamIdId}>{"Red team"}</label>
			<select id={redTeamIdId} name="redTeamId" required>
				{teams.map((team) => (
					<option value={team.id} key={team.id}>
						{team.name}
					</option>
				))}
			</select>
			<label htmlFor={roundId}>{"Round"}</label>
			<input
				type="number"
				id={roundId}
				name="round"
				min={1}
				defaultValue={1}
				required
			/>
			<Submit value="Create" />
		</Form>
	);
}
