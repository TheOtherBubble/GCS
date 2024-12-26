import { type JSX, useId } from "react";
import {
	matchFormatEnum,
	type matchesTable,
	type seasonsTable,
	type teamsTable
} from "db/schema";
import Submit from "components/Submit";
import createMatches from "db/createMatches";
import getFormField from "utility/getFormField";

/**
 * Properties that can be passed to a seed season form.
 * @public
 */
export interface SeedSeasonFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
	/** The current season. */
	season: typeof seasonsTable.$inferSelect;

	/** The teams in the current season. */
	teams: (typeof teamsTable.$inferSelect)[];
}

/**
 * A form for seeding a season.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function SeedSeasonForm({
	season,
	teams,
	...props
}: SeedSeasonFormProps) {
	const formatId = useId();

	return (
		<form
			action={async (form) => {
				"use server";

				// Read form data.
				const format = getFormField(
					form,
					"format",
					true
				) as (typeof matchFormatEnum.enumValues)[number];

				// Split season teams into pools.
				const pools = new Map<number, (typeof teamsTable.$inferSelect)[]>();
				for (const team of teams) {
					const pool = pools.get(team.pool);
					if (pool) {
						pool.push(team);
						continue;
					}

					pools.set(team.pool, [team]);
				}

				// Use the circle method to generate a single round robin regular season.
				const matches: (typeof matchesTable.$inferInsert)[] = [];
				for (const pool of pools.values()) {
					// One round per team, adding a fake "bye" team if there are an odd number of teams.
					const l = pool.length + (pool.length % 2) - 1;
					for (let i = 0; i < l; i++) {
						for (let j = 0; j < (l + 1) / 2; j++) {
							// Skip the bye team.
							const blueTeam = pool[j && ((i + j - 1) % l) + 1];
							if (!blueTeam) {
								continue;
							}

							const redTeam = pool[l - j && ((i + (l - j) - 1) % l) + 1];
							if (!redTeam) {
								continue;
							}

							matches.push({
								blueTeamId: blueTeam.id,
								format,
								redTeamId: redTeam.id,
								round: i + 1, // Round is one-based in the database.
								seasonId: season.id
							});
						}
					}
				}

				await createMatches(matches);
			}}
			{...props}
		>
			<header>
				<h3>{"Seed Season"}</h3>
				<p>{"Create a single round robin regular season."}</p>
			</header>
			<label htmlFor={formatId}>{"Format"}</label>
			<select id={formatId} name={"format"} defaultValue={"Best of 3"} required>
				{matchFormatEnum.enumValues.map((format) => (
					<option value={format} key={format}>
						{format}
					</option>
				))}
			</select>
			<Submit value="Seed" />
		</form>
	);
}
