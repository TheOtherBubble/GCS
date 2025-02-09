import { BsDiscord, BsTwitch, BsYoutube } from "react-icons/bs";
import type { JSX } from "react";
import Link from "components/Link";
import type { Metadata } from "next";
import TwitchStream from "components/TwitchStream";
import YoutubeVideo from "components/YoutubeVideo";
import getStreams from "ttv/getStreams";
import { raw } from "util/domain";
import style from "./page.module.scss";

/**
 * The landing page.
 * @returns The landing page.
 * @public
 */
export default async function Page(): Promise<JSX.Element> {
	const [streamData] = (await getStreams("1056770764")).data;

	return (
		<article className={style["content"]}>
			<header>
				<h1>{"Gauntlet Championship Series"}</h1>
			</header>
			{streamData ? (
				<TwitchStream parent={raw} channel={streamData.user_login} muted />
			) : (
				<YoutubeVideo
					id="Kr7lWQ04mmM"
					autoPlay
					fs={false}
					ivLoadPolicy={false}
					relYt={false}
					mute
					sandbox="allow-popups allow-same-origin allow-scripts"
					loading="lazy"
				/>
			)}
			<div>
				<Link href="https://discord.gg/gcsleague">
					<BsDiscord />
					{"Discord"}
				</Link>
				<Link href="https://www.twitch.tv/gcsleague">
					<BsTwitch />
					{"Twitch"}
				</Link>
				<Link href="https://www.youtube.com/@GauntletChampionshipSeries">
					<BsYoutube />
					{"YouTube"}
				</Link>
			</div>
			<h2>{"Welcome to the Gauntlet Championship Series"}</h2>
			<p>
				{
					"The Gauntlet Championship Series (GCS) is a League of Legends tournament and online community that puts an emphasis on uniting like-minded players of all skill levels together in a competitive environment. It is through this process that we are able to not only ensure that you will make friends in our community, but also improve as you play with us."
				}
			</p>
			<h2>{"What is GCS?"}</h2>
			<p>
				{
					"GCS is an organization that hosts draft tournaments for League of Legends. Our emphasis is on ensuring that, as you compete, you become united with your team, playing the game at the highest level of team play possible. Our approach to this is twofold:"
				}
			</p>
			<ul>
				<li>
					{
						"Ensure that teams get enough time in the regular season to come together and form a team identity."
					}
				</li>
				<li>
					{
						"Ensure that enough teams make it to playoffs that all have a chance at victory, regardless of how rocky the season starts may be."
					}
				</li>
			</ul>
			<hr />
			<p>
				{
					// This legal boilerplate must be posted in a location that's readily visible to players. See https://developer.riotgames.com/policies/general.
					"The Gauntlet Championship Series isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc."
				}
			</p>
			<p>
				{
					// This notice must be included in a clear and conspicuous manner on the competition website. See https://developer.riotgames.com/policies/na-tournaments.
					"This competition is not affiliated with or sponsored by Riot Games, Inc. or League of Legends Esports."
				}
			</p>
		</article>
	);
}

/**
 * The metadata of the landing page.
 * @public
 */
export const metadata = {
	description: "The home page of the Gauntlet Championship Series.",
	openGraph: { url: "/" },
	title: "Gauntlet Championship Series"
} satisfies Metadata;
