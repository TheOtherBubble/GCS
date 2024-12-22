import type { Metadata } from "next";
import { auth } from "../../../scripts/auth";
import db from "../../../scripts/db";
import { eq } from "drizzle-orm";
import getFormField from "../../../scripts/getFormField";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { seasonsTable } from "../../../scripts/schema";
import style from "./page.module.scss";

/**
 * Get a season by its vanity URL slug.
 * @param slug - The slug.
 * @returns The season, if any matches.
 * @internal
 */
const getSeasonBySlug = async (
	slug: string
): Promise<typeof seasonsTable.$inferSelect | undefined> => {
	const [season] = await db
		.select()
		.from(seasonsTable)
		.where(eq(seasonsTable.vanityUrl, decodeURIComponent(slug)))
		.limit(1);
	return season;
};

/**
 * Get a list of every season.
 * @returns A list of every season.
 * @internal
 */
const getAllSeasons = async (): Promise<(typeof seasonsTable.$inferSelect)[]> =>
	await db.select().from(seasonsTable).orderBy(seasonsTable.id);

/**
 * Parameters that are passed to a season page.
 * @public
 */
export interface SeasonsPageParams {
	/** The vanity URL ending of the season. */
	slug: string;
}

/**
 * Properties that are passed to a season page.
 * @public
 */
export interface SeasonsPageProps {
	/** The parameters that were passed to the page. */
	params: Promise<SeasonsPageParams>;
}

/**
 * A page that displays information about a season.
 * @param params - The dynamic route parameters, including the ID of the season.
 * @returns The season page.
 */
export default async function Page(props: SeasonsPageProps) {
	const seasons = await getAllSeasons();
	const changeSeasonForm = (
		<form
			// Server actions must be asynchronous.
			// eslint-disable-next-line @typescript-eslint/require-await
			action={async (formData) => {
				"use server";
				redirect(
					`/seasons/${encodeURIComponent(getFormField(formData, "vanityUrl", true))}`
				);
			}}
		>
			<label htmlFor="vanityUrl">{"Change season:"}</label>
			<select id="vanityUrl" name="vanityUrl" required>
				{seasons.map((season) => (
					<option value={season.vanityUrl} key={season.id}>
						{season.name}
					</option>
				))}
			</select>
			<input type="submit" value="Go" />
		</form>
	);

	const { slug } = await props.params;
	const vanityUrl = decodeURIComponent(slug);
	const season = seasons.find((value) => value.vanityUrl === vanityUrl);

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

	return (
		<div className={style["content"]}>
			<div className={style["config"]}>
				<h1>{season.name}</h1>
				<hr />
				{changeSeasonForm}
				{session?.user?.isAdministator && (
					<div>
						<h2>{"Admin Panel"}</h2>
						<form
							action={async (formData) => {
								"use server";
								const newVanityUrl = getFormField(formData, "vanityUrl");
								await db
									.update(seasonsTable)
									.set({
										name: getFormField(formData, "name"),
										startDate: getFormField(formData, "startDate"),
										vanityUrl: newVanityUrl
									})
									.where(eq(seasonsTable.id, season.id));
								if (newVanityUrl) {
									redirect(`/seasons/${encodeURIComponent(newVanityUrl)}`);
								}

								// If the vanity URL didn't change, just reload the page instead.
								revalidatePath(`/seasons/${slug}`);
							}}
						>
							<label htmlFor="startDate">{"Start date:"}</label>
							<input type="date" id="startDate" name="startDate" />
							<label htmlFor="name">{"Name:"}</label>
							<input type="text" id="name" name="name" />
							<label htmlFor="vanityUrl">{"Vanity URL:"}</label>
							<input type="text" id="vanityUrl" name="vanityUrl" />
							<input type="submit" value="Update" />
						</form>
						<form
							action={async () => {
								"use server";
								await db
									.delete(seasonsTable)
									.where(eq(seasonsTable.id, season.id));
								revalidatePath(`/seasons/${slug}`);
							}}
						>
							<input type="submit" value="Delete" />
						</form>
					</div>
				)}
			</div>
			<div className={style["schedule"]}>
				<h2>{"Schedule"}</h2>
				{/* TODO */}
			</div>
			<div className={style["leaderboards"]}>
				<h2>{"Leaderboards"}</h2>
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
	props: SeasonsPageProps
): Promise<Metadata> => {
	const { slug } = await props.params;
	const season = await getSeasonBySlug(slug);

	return {
		description: season
			? `The schedule for Gauntlet Championship Series ${season.name}.`
			: "An unknown season of the Gauntlet Championship Series.",
		openGraph: { url: `/seasons/${slug}` },
		title: season?.name ?? "Unknown Season"
	};
};
