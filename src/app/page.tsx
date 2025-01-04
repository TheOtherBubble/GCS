import type { Metadata } from "next";

/**
 * The landing page.
 * @returns The landing page.
 * @public
 */
export default function Page() {
	return (
		<>
			<h1>{"Gauntlet Championship Series"}</h1>
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
		</>
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
