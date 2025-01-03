import type { Game } from "types/db/Game";
import type { GameResult } from "types/db/GameResult";
import type { JSX } from "react";
import type { PlayerGameResult } from "types/db/PlayerGameResult";
import type { TeamGameResult } from "types/db/TeamGameResult";
import getGameUrl from "util/getGameUrl";
import multiclass from "util/multiclass";
import style from "./styles/game-card.module.scss";

/**
 * Properties that can be passed to a game card.
 * @public
 */
export interface GameCardProps
	extends Omit<JSX.IntrinsicElements["a"], "children" | "style" | "href"> {
	/** The game that is represented by the card. */
	game: Game;

	/** The result of the game that is represented by the card. */
	gameResult?: GameResult | undefined;

	/** The team game results. */
	teamGameResults?: TeamGameResult[];

	/** The player game results. */
	playerGameResults?: PlayerGameResult[];
}

/**
 * A card that displays information about a game.
 * @param props - The properties to pass to the game card.
 * @returns The game card.
 * @public
 */
export default function GameCard({
	game,
	gameResult,
	teamGameResults,
	playerGameResults,
	className,
	...props
}: GameCardProps) {
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
				<h2>{gameResult.name}</h2>
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
