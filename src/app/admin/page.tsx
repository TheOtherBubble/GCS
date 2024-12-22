import type { Metadata } from "next";
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
	return session ? (
		<>
			<h1 className={style["title"]}>{"Administrator Page"}</h1>
			<hr />
			<div className={style["widgets"]}>
				<div>
					<h2>{"Create Season"}</h2>
					<form
						action={async (formData) => {
							"use server";
							await db.insert(seasonsTable).values({
								name: getFormField(formData, "name", true),
								startDate: getFormField(formData, "startDate"),
								vanityUrl: getFormField(formData, "vanityUrl", true)
							});
						}}
					>
						<label htmlFor="startDate">{"Start date:"}</label>
						<input type="date" id="startDate" name="startDate" />
						<label htmlFor="name">{"Name:"}</label>
						<input type="text" id="name" name="name" required />
						<label htmlFor="vanityUrl">{"Vanity URL:"}</label>
						<input type="text" id="vanityUrl" name="vanityUrl" required />
						<input type="submit" value="Create" />
					</form>
				</div>
			</div>
		</>
	) : (
		<p>{"You must be an administrator to view this page."}</p>
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
