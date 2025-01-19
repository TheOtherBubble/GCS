import Form, { type FormProps } from "components/Form";
import type { Match } from "types/db/Match";
import Submit from "components/Submit";
import createGames from "db/createGames";
import getMatchUrl from "util/getMatchUrl";
import hasRiotApiKey from "util/hasRiotApiKey";
import makeTournamentCodes from "riot/makeTournamentCodes";
import { revalidatePath } from "next/cache";

/**
 * Properties that can be passed to a create game form.
 * @public
 */
export interface CreateGameFormProps
	extends Omit<FormProps, "action" | "children"> {
	/** The current match. */
	match: Match;
}

/**
 * A form for creating a game.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function CreateGameForm({
	match,
	...props
}: CreateGameFormProps) {
	return (
		<Form
			action={async () => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				const [tournamentCode] = await makeTournamentCodes(
					void 0,
					void 0,
					match.seasonId
				);
				if (!tournamentCode) {
					return "Failed to create a tournament code.";
				}

				await createGames({ matchId: match.id, tournamentCode });
				revalidatePath(getMatchUrl(match.id.toString() as `${number}`));
				return void 0;
			}}
			{...props}
		>
			<header>
				<h3>{"Create Game"}</h3>
			</header>
			<p>
				<Submit value="Create" />
			</p>
		</Form>
	);
}
