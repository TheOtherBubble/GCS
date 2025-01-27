import type {
	gameResultTable,
	gameTable,
	playerGameResultTable,
	teamGameResultTable
} from "db/schema";
import type { JSX } from "react";
import type { LinkProps } from "./Link";
import getGameUrl from "util/getGameUrl";
import multiclass from "util/multiclass";
import style from "./styles/game-card.module.scss";

/**
 * Properties that can be passed to a game card.
 * @public
 */
export interface GameCardProps extends Omit<LinkProps, "children" | "href"> {
	/** The game that is represented by the card. */
	game: typeof gameTable.$inferSelect;

	/** The result of the game that is represented by the card. */
	gameResult?: typeof gameResultTable.$inferSelect | undefined;

	/** The team game results. */
	teamGameResults?: (typeof teamGameResultTable.$inferSelect)[] | undefined;

	/** The player game results. */
	playerGameResults?: (typeof playerGameResultTable.$inferSelect)[] | undefined;
}

/**
 * A card that displays information about a game.
 * @param props - The properties to pass to the game card.
 * @return The game card.
 * @public
 */
export default function GameCard({
	game,
	gameResult,
	teamGameResults,
	playerGameResults,
	className,
	...props
}: GameCardProps): JSX.Element {
	if (!gameResult) {
		return (
			<a
				className={multiclass(className, style["not-done"])}
				href={getGameUrl(game)}
				{...props}
			>
				<h2>{`Game #${game.id.toString()}`}</h2>
			</a>
		);
	}

	if (!teamGameResults || !playerGameResults) {
		return (
			<a
				className={multiclass(className, style["not-done"])}
				href={getGameUrl(game)}
				{...props}
			>
				<h2>{gameResult.tournamentCode}</h2>
			</a>
		);
	}

	return (
		<a
			className={multiclass(className, style["done"])}
			href={getGameUrl(game)}
			{...props}
		>
			<p>{"Coming soon..."}</p>
			<p>{"Coming soon..."}</p>
		</a>
	);
}
