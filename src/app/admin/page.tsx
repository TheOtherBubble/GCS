import type { Metadata } from "next";
import Submit from "../../components/Submit";
import { auth } from "../../scripts/auth";
import db from "../../scripts/db";
import getFormField from "../../scripts/getFormField";
import { seasonsTable } from "../../scripts/schema";
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

	return (
		<>
			<h1>{"Administrator Page"}</h1>
			<hr />
			<div className={style["widgets"]}>
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
					<header>
						<h2>{"Create Season"}</h2>
					</header>
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
