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
			<h1>{"GCS Season One Rules and Regulations"}</h1>
			<hr />
			<h2>{"Eligibility"}</h2>
			<p>
				{
					"Players who have played at least 30 games of ranked solo/duo throughout season 2024 split 3 are eligible for the tournament, regardless of their rank. Accounts that are deemed likely to be smurfing will be disqualified."
				}
			</p>
			<p>
				{
					"Players who are drafted to a team must pay a $5 USD admission fee. 100% of the money from admission fees will be given back as part of the prize pool. $400 USD will be given to the first place team ($50 USD per player). $240 USD will be given to the second place team ($30 USD per player). Failure to pay the admission fee before the first week will result in you being removed from your team. If this happens, your captain will be allowed to draft an undrafted player to replace you."
				}
			</p>
			<p>
				{"You must be a member of "}
				<Link href="https://discord.gg/gcsleague">
					{"the GCS Discord server"}
				</Link>
				{" throughout the tournament, or you will be disqualified."}
			</p>
			<h2>{"Scheduling"}</h2>
			<p>
				{
					"Sign-ups close on January 4th. The draft will take place on January 11th at noon CST. The regular season will take place on Saturdays and Sundays from January 18th through March 2nd. The playoffs will take place on Saturdays and Sundays from March 8th through April 6th, with winners bracket games taking place on Saturdays and losers bracket games taking place on Sundays (with the exceptions of the losers bracket finals on Saturday, April 5th at 12:00 PM CST and the grand finals on Sunday, April 6th at 2:00 PM CST)."
				}
			</p>
			<p>
				{
					"Each team will play two best-of-three matches each weekend during the regular season. Teams may agree to move their games to the other time slot on the same day, but may not reschedule to a different day."
				}
			</p>
			<ul>
				<li>
					{
						"One match will be played either from 12:00 PM to 2:00 PM CST or from 2:00 PM to 4:00 PM CST on Saturday."
					}
				</li>
				<li>
					{
						"One match will be played either from 2:00 PM to 4:00 PM CST or from 4:00 PM to 6:00 PM CST on Sunday."
					}
				</li>
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
				{
					"Player trades are allowed throughout the entire regular season. Players may be traded between pools. Teams must always have exactly 8 players and must always be worth over 150 points after a sequence of trades is complete."
				}
			</p>
			<h2>{"Format"}</h2>
			<p>
				{
					"Team captains will participate in a snake draft to select their players. Draft order will be determined by allowing lower-ranked captains to choose their draft position before higher-ranked captains. The draft will be conducted with a player budget. All teams must meet the following conditions during their draft:"
				}
			</p>
			<ul>
				<li>
					{"Teams must be worth more than 80 points by their third pick."}
				</li>
				<li>
					{
						"Teams must be worth more than 160 points by their seventh (final) pick."
					}
				</li>
			</ul>
			<p>
				{
					"The tournament is played between 16 teams consisting of 8 players each. Teams will be split into two pools of 8 teams each. Teams will compete in a best-of-three double round robin regular season. Teams will earn points to determine seeding based on their performance in the regular season as follows:"
				}
			</p>
			<ul>
				<li>{"3 points for winning 2-0."}</li>
				<li>{"2 points for winning 2-1."}</li>
				<li>{"1 point for losing 1-2."}</li>
				<li>{"0 points for losing 0-2."}</li>
			</ul>
			<p>
				{
					"During the regular season, each player must play either 6 full matches or 15 individual games. Failure to meet these requirements with all players will result in your team being unable to advance to playoffs. If this happens, your playoffs spot will be given to the next team in line."
				}
			</p>
			<p>
				{
					"The six teams with the highest number of points from each pool at the end of the regular season will advance to the playoff stage, with the lowest two teams of those six starting in the losers bracket. The playoffs stage will consist of a best-of-three double elimination bracket, with the exception of the winners finals, losers finals, and grand finals, which will be best-of-five matches. Bracket matches will take place on Saturdays either from 12:00 PM to 2:00 PM CST or from 2:00 PM to 4:00 PM CST. Advancement matches will take place on Sundays either from 2:00 PM to 4:00 PM or from 4:00 PM to 6:00 PM CST. Games may be rescheduled to the other time slot on the same day if all four involved captains agree."
				}
			</p>
			<p>
				{
					"There are no bracket resets. The team that advances through the winners bracket to the grand finals will receive the ability to take away a ban from their opponent in the first game."
				}
			</p>
			<p>
				{
					"During playoffs, the total value of your rosters by the conclusion of game 2 must be at least 140 (210 points by the conclusion of game 3 for best-of-five matches)."
				}
			</p>
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
					"A player may be removed from a team by a unanimous anonymous vote of the other players on the team. These anonymous votes must be sent directly to the tournament administrator. A replacement player for the removed player must be approved by a tournament organizer or moderator. Replacement players may not exceed the peak rank of the player being replaced."
				}
			</p>
			<p>
				{
					"Late/emergency substitutions occur when a substitute from the official roster replaces a player due to an unanticipated event (such as an emergency, power outage, or connection issue) during a series. In such a situation, the team must reach out to a tournament organizer or moderator and inform them about the details so that they can determine the best course of action. Teams that attempt to exploit the emergency substitution rules may be forced to forfeit the game."
				}
			</p>
			<ul>
				<li>
					{
						"For emergency substitutions prior to the draft of a game, an official substitute will be used with a one-ban penalty or the game will be rescheduled. If neither is possible, the game will be forfeited."
					}
				</li>
				<li>
					{
						"For emergency substitutions during a game, following a 10 minute (maximum) pause, the team will be forced to play without the affected player or forfeit."
					}
				</li>
				<li>
					{
						"For emergency substitutions after the draft of a game, a substitute player will take over the missing player's position and the draft will remain as-is. The draft may be redone if both teams agree, with the substituting team losing one ban."
					}
				</li>
			</ul>
		</article>
	);
}

/**
 * The metadata of the rulebook page.
 * @public
 */
export const metadata = {
	description: "The current rulebook of the Gauntlet Championship Series.",
	openGraph: { url: "/rulebook" },
	title: "Rulebook"
} satisfies Metadata;
