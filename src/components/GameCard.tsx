import type {
	gameResultTable,
	gameTable,
	playerGameResultTable,
	teamGameResultTable
} from "db/schema";
import type { JSX } from "react";
import getGameUrl from "utility/getGameUrl";
import multiclass from "utility/multiclass";
import style from "./styles/game-card.module.scss";

/**
 * Properties that can be passed to a game card.
 * @public
 */
export interface GameCardProps
	extends Omit<JSX.IntrinsicElements["a"], "children" | "style" | "href"> {
	/** The game that is represented by the card. */
	game: typeof gameTable.$inferSelect;

	/** The result of the game that is represented by the card. */
	gameResult?: typeof gameResultTable.$inferSelect | undefined;

	/** The team game results. */
	teamGameResults?: (typeof teamGameResultTable.$inferSelect)[];

	/** The player game results. */
	playerGameResults?: (typeof playerGameResultTable.$inferSelect)[];
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
				className={multiclass(className, style["container"])}
				href={getGameUrl(game)}
				{...props}
			>
				<h2 className={style["center"]}>{`Game #${game.id.toString()}`}</h2>
			</a>
		);
	}

	if (!teamGameResults) {
		return (
			<a
				className={multiclass(className, style["container"])}
				href={getGameUrl(game)}
				{...props}
			>
				<div className={style["center"]}>
					<h2>{gameResult.name}</h2>
					<p>{`${gameResult.map} - ${gameResult.mode} - ${gameResult.type}`}</p>
					<p>{`Patch ${gameResult.version}`}</p>
				</div>
			</a>
		);
	}

	// TODO
	if (!playerGameResults) {
		<a
			className={multiclass(className, style["container"])}
			href={getGameUrl(game)}
			{...props}
		>
			<p>{"Coming soon..."}</p>
		</a>;
	}

	// TODO
	return (
		<a
			className={multiclass(className, style["container"])}
			href={getGameUrl(game)}
			{...props}
		>
			<p>{"Coming soon..."}</p>
		</a>
	);
}
