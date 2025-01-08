import Form, { type FormProps } from "components/Form";
import type { InsertMatch } from "types/db/Match";
import type { MatchFormat } from "types/db/MatchFormat";
import type { Season } from "types/db/Season";
import Submit from "components/Submit";
import type { Team } from "types/db/Team";
import createMatches from "db/createMatches";
import getFormField from "util/getFormField";
import getSeasonUrl from "util/getSeasonUrl";
import hasRiotApiKey from "util/hasRiotApiKey";
import { matchFormatEnum } from "db/schema";
import { revalidatePath } from "next/cache";
import { useId } from "react";

/**
 * Properties that can be passed to a seed season form.
 * @public
 */
export interface SeedSeasonFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current season. */
	season: Season;

	/** The teams in the current season. */
	teams: Team[];
}

/**
 * A form for generating a regular season.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function GenerateRegularSeasonForm({
	season,
	teams,
	...props
}: SeedSeasonFormProps) {
	const formatId = useId();
	const roundsId = useId();

	return (
		<Form
			action={async (form) => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				const format = getFormField(form, "format", true) as MatchFormat;
				const rounds = parseInt(getFormField(form, "rounds", true), 10);

				// Split season teams into pools.
				const pools = new Map<number, Team[]>();
				for (const team of teams) {
					const pool = pools.get(team.pool);
					if (pool) {
						pool.push(team);
						continue;
					}

					pools.set(team.pool, [team]);
				}

				// Use the circle method to generate a single round robin regular season.
				const matches: InsertMatch[] = [];
				for (let i = 0; i < rounds; i++) {
					for (const pool of pools.values()) {
						// One round per team, adding a fake "bye" team if there are an odd number of teams.
						const l = pool.length + (pool.length % 2) - 1; // Minus one to make zero-based for ease of use.
						const matchesInRound = (l + 1) / 2;
						for (let j = 0; j < l; j++) {
							for (let k = 0; k < matchesInRound; k++) {
								const blueTeam = pool[k && ((j + k - 1) % l) + 1];
								const redTeam = pool[l - k && ((j + (l - k) - 1) % l) + 1];

								// Skip the bye team.
								if (!blueTeam || !redTeam) {
									continue;
								}

								matches.push({
									blueTeamId: blueTeam.id,
									format,
									redTeamId: redTeam.id,
									round: i * l + j + 1, // One-based in database.
									seasonId: season.id,
									timeSlot: Math.floor((2 * k) / matchesInRound) + 1 // One-based in database.
								});
							}
						}
					}
				}

				await createMatches(matches);
				revalidatePath(getSeasonUrl(season));
				return void 0;
			}}
			{...props}
		>
			<header>
				<h3>{"Generate Regular Season"}</h3>
			</header>
			<label htmlFor={formatId}>{"Format"}</label>
			<select id={formatId} name="format" defaultValue="Best of 3" required>
				{matchFormatEnum.enumValues.map((format) => (
					<option value={format} key={format}>
						{format}
					</option>
				))}
			</select>
			<label htmlFor={roundsId}>{"Rounds"}</label>
			<input
				type="number"
				id={roundsId}
				name="rounds"
				min={1}
				defaultValue={2}
				required
			/>
			<Submit value="Generate" />
		</Form>
	);
}
