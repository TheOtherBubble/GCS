import CreateSeasonForm from "./CreateSeasonForm";
import type { Metadata } from "next";
import { auth } from "db/auth";
import style from "./page.module.scss";

/**
 * An administrator-only page for configuring database objects.
 * @returns The admin page.
 * @public
 */
export default async function Page() {
	const session = await auth();
	if (!session?.user?.isAdministator) {
		return <p>{"You must be an administrator to view this page."}</p>;
	}

	return (
		<>
			<h1>{"Administrator Tools"}</h1>
			<hr />
			<div className={style["widgets"]}>
				<CreateSeasonForm />
			</div>
		</>
	);
}

/**
 * The metadata of the administrator page.
 * @public
 */
export const metadata = {
	description: "GCS administrator tools.",
	openGraph: { url: "/admin" },
	title: "Admin Tools"
} satisfies Metadata;
