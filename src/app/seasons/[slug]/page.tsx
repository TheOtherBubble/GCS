import type { Metadata } from "next";
import type PageProps from "../../../scripts/PageProps";
import Submit from "../../../components/Submit";
import { auth } from "../../../scripts/auth";
import db from "../../../scripts/db";
import { eq } from "drizzle-orm";
import getAllSeasons from "../../../scripts/getAllSeasons";
import getFormField from "../../../scripts/getFormField";
import getSeasonByVanityUrlSlug from "../../../scripts/getSeasonByVanityUrlSlug";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { seasonsTable } from "../../../scripts/schema";
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
			<label htmlFor="vanity-url-slug">{"Change season"}</label>
			<select
				id="vanity-url-slug"
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
							<label htmlFor="start-date">{"Start date"}</label>
							<input type="date" id="start-date" name="startDate" />
							<label htmlFor="name">{"Name"}</label>
							<input type="text" id="name" name="name" />
							<label htmlFor="vanity-url-slug">{"Vanity URL slug"}</label>
							<input type="text" id="vanity-url-slug" name="vanityUrlSlug" />
							<Submit value="Update" />
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
							<Submit value="Delete" />
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
