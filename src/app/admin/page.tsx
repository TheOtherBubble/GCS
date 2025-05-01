import { forbidden, unauthorized } from "next/navigation";
import CreateSeasonForm from "./CreateSeasonForm";
import Document from "types/Document";
import type { JSX } from "react";
import type { Metadata } from "next";
import UpdateSignUpQuestionsForm from "./UpdateSignUpQuestionsForm";
import { auth } from "db/auth";
import db from "db/db";
import { documentTable } from "db/schema";
import { eq } from "drizzle-orm";
import style from "./page.module.scss";

/**
 * An administrator-only page for configuring database objects.
 * @returns The admin page.
 * @public
 */
export default async function Page(): Promise<JSX.Element> {
	const session = await auth();
	if (!session?.user) {
		unauthorized();
	}

	if (!session.user.isAdmin) {
		forbidden();
	}

	const [signUpQuestions] = await db
		.select()
		.from(documentTable)
		.where(eq(documentTable.id, Document.SIGN_UP_QUESTIONS));

	return (
		<>
			<header>
				<h1>{"Administrator Tools"}</h1>
				<hr />
			</header>
			<div className={style["widgets"]}>
				<CreateSeasonForm />
				<UpdateSignUpQuestionsForm text={signUpQuestions?.text ?? void 0} />
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
