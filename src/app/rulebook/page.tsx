import Link from "components/Link";
import type { Metadata } from "next";
import style from "./page.module.scss";

/**
 * A page that displays the rulebook.
 * @returns The rulebook page.
 * @public
 */
export default function Page() {
	return (
		<article className={style["content"]}>
			<h1>{"Season One Rulebook"}</h1>
			<hr />
			<h2>{"Eligibility"}</h2>
			<p>
				{
					"Players who have played at least 30 games of ranked solo/duo throughout the previous split are eligible for the tournament, regardless of their rank. Accounts that are deemed likely to be smurfing will be disqualified."
				}
			</p>
			<p>
				{"You must be a member of "}
				{/* TODO: Discord server invite link will likely need to be updated. */}
				<Link href="https://discord.com/invite/vlnleague">
					{"the GCS Discord server"}
				</Link>
				{" throughout the tournament, or you will be disqualified."}
			</p>
			<h2>{"Scheduling"}</h2>
			<p>
				{
					"The sign up period lasts for one week. The draft will take place on the following Saturday at noon CST."
				}
			</p>
			<p>{"Each team will play two best-of-three matches each weekend."}</p>
			<ul>
				<li>{"One match will be played at noon CST each Saturday."}</li>
				<li>{"One match will be played at 2:00 PM CST each Sunday."}</li>
			</ul>
			<p>
				{
					"Player substitutions within a match (i.e. between games in a best-of-three) are allowed as long as the following conditions are met:"
				}
			</p>
			<ul>
				<li>
					{
						"The opposing captain (and stream team, if applicable) must be supplied with the account details of the player being substituted in."
					}
				</li>
				<li>
					{
						"The opposing captain must be clearly informed about which player is being substituted out."
					}
				</li>
				<li>{"Substitutions from outside of a team are not allowed."}</li>
			</ul>
			<p>
				{
					"Matches cannot be rescheduled. If a team cannot field a roster, they will be disqualified. If a team is late to a match, they will be penalized depending on how late they are."
				}
			</p>
			<ul>
				<li>
					{"Teams that are less than 10 minutes late will face no penalty."}
				</li>
				<li>
					{
						"Teams that are between 11 and 20 minutes late will lose one ban in the first game."
					}
				</li>
				<li>
					{
						"Teams that are between 21 and 30 minutes late will lose one ban for each game in the match."
					}
				</li>
				<li>
					{
						"Teams that are between 31 and 40 minutes late will be assigned a loss for the first game in the match."
					}
				</li>
				<li>
					{
						"Teams that are 41 or more minutes late will be assigned a loss for the match."
					}
				</li>
				<li>{"Teams that are excessively tardy will be disqualified."}</li>
			</ul>
			<p>
				{
					"Players must join their team's voice channel no less than 10 minutes prior to the start of games in which they play. Teams must use the voice channel that is assigned to them in the GCS Discord server."
				}
			</p>
			<p>
				{"Player trades are allowed within the first week following the draft."}
			</p>
			<ul>
				<li>{"All trades must be approved by a tournament moderator."}</li>
				<li>
					{
						"Only captains and tournament moderators need to agree to a trade for it to be considered valid."
					}
				</li>
			</ul>
			<h2>{"Format"}</h2>
			<p>
				{
					"Team captains will participate in a snake draft to select their players. Draft order will be determined by allowing lower-ranked captains to choose their draft position before higher-ranked captains."
				}
			</p>
			<p>
				{
					"Players will be assigned to tiers that are based on a combination of quantifiable and unquantifiable factors, including current rank, peak rank, past season performances, and behavior. Captains will be allowed to draft a set number of players from each tier. These numbers are subject to change depending on the composition of the draft class."
				}
			</p>
			<ul>
				<li>{"One tier 1 player."}</li>
				<li>{"Two tier 2 players."}</li>
				<li>{"Three tier 3 players."}</li>
				<li>{"Two tier 4 players."}</li>
			</ul>
			<p>
				{
					"The tournament is played between 20 teams consisting of 8 players each. Teams will compete in a best-of-three single round robin regular season. During the regular season, each player must meet the following conditions:"
				}
			</p>
			<ul>
				<li>{"Each player must participate in at least 12 matches."}</li>
				<li>{"Each player must play no more than 45 games."}</li>
			</ul>
			<p>
				{
					"The 8 teams with the highest match scores at the end of the regular season will advance to the playoff stage. Tiebreakers are determined by head-to-head score, then by game score, then by average game time. The playoffs stage will consist of a best-of-five single elimination bracket. During the playoffs stage, each team must meet the following conditions:"
				}
			</p>
			<ul>
				<li>
					{
						"Each team must play at least 2 players in each game that did not play in the previous game."
					}
				</li>
				<li>{"Each player must play at least 1 game by the third game."}</li>
				<li>{"Each player must play at least 3 games by the fifth game."}</li>
			</ul>
			<h2>{"Captains"}</h2>
			<p>
				{
					"Captains will serve as the main point of communication between tournament staff and individual players. Captains are expected to be responsive and helpful. If you believe that your captain is not fulfilling these requirements, file a report on them."
				}
			</p>
			<p>{"Captains have the following responsibilities:"}</p>
			<ul>
				<li>{"Draft players to your team on draft day."}</li>
				<li>{"Schedule players to play in each game."}</li>
				<li>{"Upload game replay files as directed."}</li>
			</ul>
			<h2>{"Game Rules"}</h2>
			<h3>{"Champion Select"}</h3>
			<p>
				{
					"Draft may be done either in-client on out of client. Draft must be done out of client if requested by either team."
				}
			</p>
			<p>
				{
					"For streamed games, players must be arranged from top to bottom in the following order: top, jungle, middle, bottom, support."
				}
			</p>
			<p>
				{
					"Role swapping is allowed. Champion roles may be changed but must be selected by their player 30 seconds prior to the end of champion select."
				}
			</p>
			<p>
				{
					"The entire team is permitted to be in call during champion select, but only the players that are participating in the game may remain in call once the game begins (including players that are muted and deafened)."
				}
			</p>
			<p>
				{
					"Players that are participating in a champion select or a game may not stream snipe."
				}
			</p>
			<h3>{"In-Game"}</h3>
			<p>
				{
					"Teams are permitted 5 minutes of total pause time per game. Exceeding this limit will result in that team being assigned a loss for that game. Before unpausing, both teams must agree to unpause. If a team unpauses without the permission of their opponent, they will lose one ban in their next game. Teams may not pause while any player is in combat. If a team pauses while a player is in combat, a tournament moderator must be informed during the pause. If a team pauses while a player is in combat and unpauses before a tournament moderator is contacted, that team will be disqualified."
				}
			</p>
			<p>
				{
					"Use of all in-game communication functions (including chat and emotes) is permitted. Players with excessively bad manners will receive a temporary or permanent ban from the tournament."
				}
			</p>
			<h3>{"Post-Game"}</h3>
			<p>
				{
					"Players that participate in a streamed game may not publicly discuss the result of that game before it is broadcasted."
				}
			</p>
			<p>
				{
					"When on stream or in a stream's chat, do not verbally attack other players or viewers. Violating the Twitch terms of service will result in an immediate ban. Do not advertise without explicit permission from the tournament administrator."
				}
			</p>
			<h2>{"Streaming"}</h2>
			<p>
				{
					"Games that are streamed on the official channel may not be streamed elsewhere. Games that are not streamed on the official channel may be streamed elsewhere, but only on a 3-minute delay and only if a link to the stream is posted in the relevant channel in the official Discord server beforehand."
				}
			</p>
			<h2>{"Miscellaneous"}</h2>
			<p>
				{
					"Do not abuse the player reporting system; doing so will result in disciplinary action against you or your team."
				}
			</p>
			<p>
				{
					"A player may be removed from a team by a unanimous anonymous vote of the other players on the team. These anonymous votes must be sent directly to the tournament administrator."
				}
			</p>
		</article>
	);
}

/**
 * The metadata of the rulebook page.
 * @public
 */
export const metadata: Metadata = {
	description: "The current rulebook of the Gauntlet Championship Series.",
	openGraph: { url: "/rulebook" },
	title: "Rulebook"
};
