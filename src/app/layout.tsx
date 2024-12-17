import "../styles/global.scss";
import type { Metadata, Viewport } from "next";
import type LayoutProps from "../scripts/LayoutProps";
import domain from "../scripts/domain";
import style from "./layout.module.scss";

export default function Layout({ children }: LayoutProps) {
	return (
		<html lang="en-US">
			<body className={style["spacer"]}>
				<header></header>
				<main>{children}</main>
				<footer></footer>
			</body>
		</html>
	);
}

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#140031"
};

export const metadata: Metadata = {
	authors: [{ name: "Travis Martin", url: "https://www.lakuna.pw" }],
	creator: "Travis Martin",
	metadataBase: new URL(domain),
	openGraph: {
		siteName: "VLN League",
		type: "website"
	},
	publisher: "Travis Martin",
	title: {
		default: "Page",
		template: "%s | VLN"
	}
};
