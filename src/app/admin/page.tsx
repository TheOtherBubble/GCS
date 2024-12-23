import {
	matchFormatEnum,
	matchesTable,
	seasonsTable,
	teamsTable
} from "../../scripts/schema";
import type { Metadata } from "next";
import Submit from "../../components/Submit";
import { auth } from "../../scripts/auth";
import db from "../../scripts/db";
import domain from "../../scripts/domain";
import getAllSeasons from "../../scripts/getAllSeasons";
import getAllTeams from "../../scripts/getAllTeams";
import getAllTeamsWithSeasonId from "../../scripts/getAllTeamsWithSeasonId";
import getFormField from "../../scripts/getFormField";
import style from "./page.module.scss";

/**
 * An administrator-only page for configuring database objects.
 * @public
 */
export default async function Page() {
	const session = await auth();
	if (!session?.user?.isAdministator) {
		return <p>{"You must be an administrator to view this page."}</p>;
	}

	const seasons = await getAllSeasons();
	const [latestSeason] = seasons.sort(
		(a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
	);
	const makeSeasonIdDropdown = (id: string, name: string) => (
		<>
			<label htmlFor={id}>{"Season"}</label>
			<select id={id} name={name} defaultValue={latestSeason?.id} required>
				{seasons.map((season) => (
					<option value={season.id} key={season.id}>
						{season.name}
					</option>
				))}
			</select>
		</>
	);

	const teams = await getAllTeams();
	const makeTeamIdDropdown = (id: string, name: string, label: string) => (
		<>
			<label htmlFor={id}>{label}</label>
			<select id={id} name={name} required>
				{teams.map((team) => (
					<option value={team.id} key={team.id}>
						{team.name}
					</option>
				))}
			</select>
		</>
	);

	const makeMatchFormatsDropdown = (id: string, name: string) => (
		<>
			<label htmlFor={id}>{"Format"}</label>
			<select id={id} name={name} defaultValue={"Best of 3"} required>
				{matchFormatEnum.enumValues.map((format) => (
					<option value={format} key={format}>
						{format}
					</option>
				))}
			</select>
		</>
	);

	return (
		<>
			<h1 className={style["title"]}>{"Administrator Page"}</h1>
			<hr />
			<div className={style["widgets"]}>
				<div>
					<h2>{"Create Season"}</h2>
					<form
						action={async (form) => {
							"use server";
							await db.insert(seasonsTable).values({
								name: getFormField(form, "name", true),
								startDate: getFormField(form, "startDate"),
								vanityUrlSlug: getFormField(form, "vanityUrlSlug", true)
							});
						}}
					>
						<label htmlFor="create-season-start-date">{"Start date"}</label>
						<input type="date" id="create-season-start-date" name="startDate" />
						<label htmlFor="create-season-name">{"Name"}</label>
						<input
							type="text"
							id="create-season-name"
							name="name"
							maxLength={0x40}
							required
						/>
						<label htmlFor="create-season-vanity-url-slug">
							{"Vanity URL slug"}
						</label>
						<input
							type="text"
							id="create-season-vanity-url-slug"
							name="vanityUrlSlug"
							maxLength={0x20}
							required
						/>
						<Submit value="Create" />
					</form>
				</div>
				<div>
					<h2>{"Create Team"}</h2>
					<form
						action={async (form) => {
							"use server";
							await db.insert(teamsTable).values({
								code: getFormField(form, "code", true),
								color: getFormField(form, "color", true).substring(1), // Cut off pound.
								logoUrl: getFormField(form, "logoUrl", true),
								name: getFormField(form, "name", true),
								pool: parseInt(getFormField(form, "pool", true), 10),
								seasonId: parseInt(getFormField(form, "seasonId", true), 10),
								vanityUrlSlug: getFormField(form, "vanityUrlSlug", true)
							});
						}}
					>
						<label htmlFor="create-team-code">{"Code"}</label>
						<input
							type="text"
							id="create-team-code"
							name="code"
							maxLength={4}
							required
						/>
						<label htmlFor="create-team-color">{"Color"}</label>
						<input type="color" id="create-team-color" name="color" required />
						<label htmlFor="create-team-logo-url">{"Logo URL"}</label>
						<input
							type="url"
							id="create-team-logo-url"
							name="logoUrl"
							maxLength={0x800}
							defaultValue={`${domain}/default.png`}
							required
						/>
						<label htmlFor="create-team-name">{"Name"}</label>
						<input
							type="text"
							id="create-team-name"
							name="name"
							maxLength={0x40}
							required
						/>
						<label htmlFor="create-team-pool">{"Pool"}</label>
						<input
							type="number"
							id="create-team-pool"
							name="pool"
							min={1}
							defaultValue={1}
						/>
						{makeSeasonIdDropdown("create-team-season-id", "seasonId")}
						<label htmlFor="create-team-vanity-url-slug">
							{"Vanity URL slug"}
						</label>
						<input
							type="text"
							id="create-team-vanity-url-slug"
							name="vanityUrlSlug"
							maxLength={0x20}
							required
						/>
						<Submit value="Create" />
					</form>
				</div>
				<div>
					<h2>{"Create Match"}</h2>
					<form
						action={async (form) => {
							"use server";
							await db.insert(matchesTable).values({
								blueTeamId: parseInt(
									getFormField(form, "blueTeamId", true),
									10
								),
								format: getFormField(
									form,
									"format",
									true
								) as (typeof matchFormatEnum.enumValues)[number],
								redTeamId: parseInt(getFormField(form, "redTeamId", true), 10),
								round: parseInt(getFormField(form, "round", true), 10),
								seasonId: parseInt(getFormField(form, "seasonId", true), 10)
							});
						}}
					>
						{makeTeamIdDropdown(
							"create-match-blue-team-id",
							"blueTeamId",
							"Blue team"
						)}
						{makeMatchFormatsDropdown("create-match-format", "format")}
						{makeTeamIdDropdown(
							"create-match-red-team-id",
							"redTeamId",
							"Red team"
						)}
						{makeSeasonIdDropdown("create-match-season-id", "seasonId")}
						<label htmlFor="create-match-round">{"Round"}</label>
						<input
							type="number"
							id="create-match-round"
							name="round"
							min={1}
							defaultValue={1}
							required
						/>
						<Submit value="Create" />
					</form>
				</div>
				<div>
					<h2>{"Seed Season"}</h2>
					<form
						action={async (form) => {
							"use server";

							// Read form data.
							const format = getFormField(
								form,
								"format",
								true
							) as (typeof matchFormatEnum.enumValues)[number];
							const seasonId = parseInt(
								getFormField(form, "seasonId", true),
								10
							);

							// Split season teams into pools.
							const seasonTeams = await getAllTeamsWithSeasonId(seasonId);
							const pools = new Map<
								number,
								(typeof teamsTable.$inferSelect)[]
							>();
							for (const team of seasonTeams) {
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
											seasonId
										});
									}
								}
							}

							await db.insert(matchesTable).values(matches);
						}}
					>
						{makeMatchFormatsDropdown("seed-season-format", "format")}
						{makeSeasonIdDropdown("seed-season-season-id", "seasonId")}
						<Submit value="Seed" />
					</form>
				</div>
			</div>
		</>
	);
}

/**
 * The metadata of the administrator page.
 * @public
 */
export const metadata: Metadata = {
	description: "GCS administrator tools.",
	openGraph: { url: "/admin" },
	title: "Admin Tools"
};
