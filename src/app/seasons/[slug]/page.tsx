import {
	matchFormatEnum,
	matchesTable,
	seasonsTable,
	teamsTable
} from "../../../scripts/schema";
import type { Metadata } from "next";
import type PageProps from "../../../scripts/PageProps";
import Submit from "../../../components/Submit";
import { auth } from "../../../scripts/auth";
import db from "../../../scripts/db";
import domain from "../../../scripts/domain";
import { eq } from "drizzle-orm";
import getAllSeasons from "../../../scripts/getAllSeasons";
import getAllTeamsWithSeasonId from "../../../scripts/getAllTeamsWithSeasonId";
import getFormField from "../../../scripts/getFormField";
import getSeasonByVanityUrlSlug from "../../../scripts/getSeasonByVanityUrlSlug";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import style from "./page.module.scss";

/**
 * Parameters that are passed to a season page.
 * @public
 */
export interface SeasonsPageParams {
	/** The season's encoded vanity URL slug. */
	slug: string;
}

/**
 * A page that displays information about a season.
 * @param params - The dynamic route parameters, including the ID of the season.
 * @returns The season page.
 */
export default async function Page(props: PageProps<SeasonsPageParams>) {
	const seasons = await getAllSeasons();
	const { slug } = await props.params;
	const season = seasons.find(
		(value) => value.vanityUrlSlug === decodeURIComponent(slug)
	);
	const changeSeasonForm = (
		<form
			// Server actions must be asynchronous.
			// eslint-disable-next-line @typescript-eslint/require-await
			action={async (form) => {
				"use server";
				redirect(
					`/seasons/${encodeURIComponent(getFormField(form, "vanityUrlSlug", true))}`
				);
			}}
		>
			<label htmlFor="change-season-vanity-url-slug">{"Change season"}</label>
			<select
				id="change-season-vanity-url-slug"
				name="vanityUrlSlug"
				defaultValue={season?.vanityUrlSlug}
				required
				// TODO: Submit on change?
			>
				{seasons.map((value) => (
					<option value={value.vanityUrlSlug} key={value.id}>
						{value.name}
					</option>
				))}
			</select>
			<Submit value="Go" />
		</form>
	);

	if (!season) {
		return (
			<div className={style["content"]}>
				<div className={style["config"]}>
					<h1>{"Unknown Season"}</h1>
					<hr />
					{changeSeasonForm}
				</div>
			</div>
		);
	}

	const session = await auth();

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
	const teams = await getAllTeamsWithSeasonId(season.id);
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

	return (
		<div className={style["content"]}>
			<div className={style["config"]}>
				<h1>{season.name}</h1>
				<hr />
				{changeSeasonForm}
				{session?.user?.isAdministator && (
					<div className={style["admin"]}>
						<h2>{"Admin Panel"}</h2>
						<form
							action={async (form) => {
								"use server";
								const newVanityUrlSlug = getFormField(form, "vanityUrlSlug");
								await db
									.update(seasonsTable)
									.set({
										name: getFormField(form, "name"),
										startDate: getFormField(form, "startDate"),
										vanityUrlSlug: newVanityUrlSlug
									})
									.where(eq(seasonsTable.id, season.id));
								if (newVanityUrlSlug) {
									redirect(`/seasons/${encodeURIComponent(newVanityUrlSlug)}`);
								}

								// If the vanity URL didn't change, just reload the page instead.
								revalidatePath(`/seasons/${slug}`);
							}}
						>
							<header>
								<h3>{"Update Season"}</h3>
							</header>
							<label htmlFor="update-season-start-date">{"Start date"}</label>
							<input
								type="date"
								id="update-season-start-date"
								name="startDate"
							/>
							<label htmlFor="update-season-name">{"Name"}</label>
							<input type="text" id="update-season-name" name="name" />
							<label htmlFor="update-season-vanity-url-slug">
								{"Vanity URL slug"}
							</label>
							<input
								type="text"
								id="update-season-vanity-url-slug"
								name="vanityUrlSlug"
							/>
							<Submit value="Update" />
						</form>
						<form
							action={async (form) => {
								"use server";

								// Prevent the user from accidentally doing something dangerous.
								if (getFormField(form, "safeguard") !== "CONFIRM") {
									return;
								}

								await db
									.delete(seasonsTable)
									.where(eq(seasonsTable.id, season.id));
								revalidatePath(`/seasons/${slug}`);
							}}
						>
							<header>
								<h3>{"Delete Season"}</h3>
							</header>
							<label htmlFor="delete-season-safeguard">{"Safeguard"}</label>
							<input
								type="text"
								id="delete-season-safeguard"
								name="safeguard"
								placeholder="CONFIRM"
							/>
							<Submit value="Delete" />
						</form>
						<form
							action={async (form) => {
								"use server";
								await db.insert(teamsTable).values({
									code: getFormField(form, "code", true),
									color: getFormField(form, "color", true).substring(1), // Cut off pound.
									logoUrl: getFormField(form, "logoUrl", true),
									name: getFormField(form, "name", true),
									pool: parseInt(getFormField(form, "pool", true), 10),
									seasonId: season.id,
									vanityUrlSlug: getFormField(form, "vanityUrlSlug", true)
								});
							}}
						>
							<header>
								<h3>{"Create Team"}</h3>
							</header>
							<label htmlFor="create-team-code">{"Code"}</label>
							<input
								type="text"
								id="create-team-code"
								name="code"
								maxLength={4}
								required
							/>
							<label htmlFor="create-team-color">{"Color"}</label>
							<input
								type="color"
								id="create-team-color"
								name="color"
								required
							/>
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
									redTeamId: parseInt(
										getFormField(form, "redTeamId", true),
										10
									),
									round: parseInt(getFormField(form, "round", true), 10),
									seasonId: season.id
								});
							}}
						>
							<header>
								<h3>{"Create Match"}</h3>
							</header>
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
								const seasonTeams = await getAllTeamsWithSeasonId(season.id);
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

											const redTeam =
												pool[l - j && ((i + (l - j) - 1) % l) + 1];
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

								await db.insert(matchesTable).values(matches);
							}}
						>
							<header>
								<h3>{"Seed Season"}</h3>
							</header>
							{makeMatchFormatsDropdown("seed-season-format", "format")}
							<Submit value="Seed" />
						</form>
					</div>
				)}
			</div>
			<div className={style["schedule"]}>
				<h2>{"Schedule"}</h2>
				<p>{"Coming soon..."}</p>
				{/* TODO */}
			</div>
			<div className={style["leaderboards"]}>
				<h2>{"Leaderboards"}</h2>
				<p>{"Coming soon..."}</p>
				{/* TODO */}
			</div>
		</div>
	);
}

/**
 * The season page's metadata.
 * @public
 */
export const generateMetadata = async (
	props: PageProps<SeasonsPageParams>
): Promise<Metadata> => {
	const { slug } = await props.params;
	const season = await getSeasonByVanityUrlSlug(decodeURIComponent(slug));

	return {
		description: season
			? `The schedule for Gauntlet Championship Series ${season.name}.`
			: "An unknown season of the Gauntlet Championship Series.",
		openGraph: { url: `/seasons/${slug}` },
		title: season?.name ?? "Unknown Season"
	};
};
