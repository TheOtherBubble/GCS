import { auth, signIn, signOut } from "../../scripts/auth";
import Image from "../Image/Image";
import type { JSX } from "react";
import Link from "../Link";
import style from "./topnav.module.scss";
import submark from "./submark.png";

/**
 * The site-wide top navigation bar.
 * @returns The navigation bar.
 * @public
 */
export default async function Topnav({
	className,
	...props
}: JSX.IntrinsicElements["nav"]) {
	const session = await auth();

	const topnavClassName = style["topnav"];

	const fullClassName = topnavClassName
		? className
			? `${topnavClassName} ${className}`
			: topnavClassName
		: className;

	return (
		<nav className={fullClassName} {...props}>
			<ul>
				<li>
					<Link href="/">
						<Image alt="Index" src={submark} />
					</Link>
				</li>
				<li>
					<Link href="/schedule">
						<span>{"Schedule"}</span>
					</Link>
				</li>
				{/* Sign in/out button, depending on whether the user is currently signed in or not. */}
				<li className={style["right"]}>
					{session ? (
						<form
							action={async () => {
								"use server";
								await signOut();
							}}
						>
							<input type="submit" value="Sign Out" />
						</form>
					) : (
						<form
							action={async () => {
								"use server";
								await signIn("discord");
							}}
						>
							<input type="submit" value="Sign In" />
						</form>
					)}
				</li>
			</ul>
		</nav>
	);
}
