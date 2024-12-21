import type { Metadata } from "next";
import { auth } from "../../scripts/auth";
import db from "../../scripts/db";
import { seasons } from "../../scripts/schema";
import style from "./page.module.scss";

/**
 * An administrator-only page for configuring database objects.
 * @public
 */
export default async function Page() {
	// Restrict access to administrators.
	const session = await auth();
	if (!session?.user?.isAdministator) {
		return <p>{"You must be an administrator to view this page."}</p>;
	}

	return (
		<>
			<h1 className={style["title"]}>{"Administrator Page"}</h1>
			<hr />
			<div className={style["widgets"]}>
				<div>
					<h2>{"Create Season"}</h2>
					<form
						action={async (formData) => {
							"use server";

							const name = formData.get("name");
							if (typeof name !== "string" || name === "") {
								throw new Error("Invalid season name.");
							}

							const season: typeof seasons.$inferInsert = { name };

							const startDate = formData.get("startDate");
							if (typeof startDate === "string" && startDate !== "") {
								season.startDate = startDate;
							}

							await db.insert(seasons).values(season);
						}}
					>
						<label htmlFor="startDate">{"Start date:"}</label>
						<input type="date" id="startDate" name="startDate" />
						<label htmlFor="name">{"Name:"}</label>
						<input type="text" id="name" name="name" required />
						<input type="submit" value="Create" />
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
