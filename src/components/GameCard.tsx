import type {
	accountTable,
	gameResultTable,
	gameTable,
	playerGameResultTable,
	playerTable,
	teamGameResultTable
} from "db/schema";
import type ChampionData from "types/riot/ChampionData";
import Image from "./Image";
import type { JSX } from "react";
import type { LinkProps } from "./Link";
import getChampionIcon from "riot/getChampionIcon";
import getChampionsList from "riot/getChampionsList";
import getGameUrl from "util/getGameUrl";
import getItemIcon from "riot/getItemIcon";
import multiclass from "util/multiclass";
import sortPlayersStandard from "util/sortPlayersStandard";
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

	/** The players in the game. */
	players?: (typeof playerTable.$inferSelect)[] | undefined;

	/** The accounts of the players in the game. */
	accounts?: (typeof accountTable.$inferSelect)[] | undefined;
}

/**
 * A card that displays information about a game.
 * @param props - The properties to pass to the game card.
 * @return The game card.
 * @public
 */
export default async function GameCard({
	game,
	gameResult,
	teamGameResults,
	playerGameResults,
	players,
	accounts,
	className,
	...props
}: GameCardProps): Promise<JSX.Element> {
	// Incomplete game.
	if (!gameResult || !teamGameResults || !playerGameResults) {
		return (
			<a
				className={multiclass(className, style["simple"])}
				href={getGameUrl(game)}
				{...props}
			>
				<h3>{`Game #${game.id.toString()}`}</h3>
			</a>
		);
	}

	const blueColor = "#00008d";
	const redColor = "#550000";
	const backgroundColor = teamGameResults.find(
		({ isWinner, riotId }) => isWinner && riotId === 100
	)
		? blueColor
		: teamGameResults.find(({ isWinner, riotId }) => isWinner && riotId === 200)
			? redColor
			: void 0;

	// Forfeited game.
	if (playerGameResults.length === 0) {
		return (
			<a
				className={multiclass(className, style["simple"])}
				href={getGameUrl(game)}
				style={{ backgroundColor }}
				{...props}
			>
				<h3>{`Game #${game.id.toString()} (Forfeit)`}</h3>
			</a>
		);
	}

	const championsByKey = Object.entries(
		(await getChampionsList()) ?? {}
	).reduce((previousValue, currentValue) => {
		return previousValue.set(
			parseInt(currentValue[1].key, 10),
			currentValue[1]
		);
	}, new Map<number, ChampionData>());

	// Player-specific game result.
	if (playerGameResults.length === 1) {
		const [result] = playerGameResults;
		if (!result) {
			throw new Error("Something impossible happened.");
		}

		const playerBackgroundColor = teamGameResults.find(
			({ isWinner, riotId }) => isWinner && riotId === result.teamId
		)
			? blueColor
			: redColor;

		const champion = championsByKey.get(result.championKey);
		const championIcon = champion && (await getChampionIcon(champion.id));

		const player = players?.find(
			({ id }) =>
				id === accounts?.find(({ puuid }) => puuid === result.puuid)?.playerId
		);

		return (
			<a
				className={multiclass(className, style["single"])}
				href={getGameUrl(game)}
				style={{ backgroundColor: playerBackgroundColor }}
				{...props}
			>
				{champion && championIcon && (
					<Image
						alt={`${champion.name} icon.`}
						src={championIcon}
						width={128}
						height={128}
					/>
				)}
				<div className={style["info"]}>
					{player ? (
						<h3>{player.displayName ?? player.name}</h3>
					) : (
						<h3>{result.name}</h3>
					)}
					<p>{`${result.kills.toString()}/${result.deaths.toString()}/${result.assists.toString()}`}</p>
					<p>{`Damage: ${result.championDamage.toLocaleString()}`}</p>
					<p>{`Level: ${result.level.toString()}`}</p>
					<p>{`Position: ${result.position}`}</p>
				</div>
				<div className={style["items"]}>
					{[
						result.item0Id,
						result.item1Id,
						result.item2Id,
						result.item6Id,
						result.item3Id,
						result.item4Id,
						result.item5Id
					].map(async (itemId, i) => {
						const src = itemId && (await getItemIcon(itemId));
						return src ? (
							<Image
								key={i}
								alt="Item icon."
								src={src}
								width={64}
								height={64}
							/>
						) : (
							<span /> // Grid placeholder.
						);
					})}
				</div>
			</a>
		);
	}

	// Normal game result.
	return (
		<a
			className={multiclass(className, style["complex"])}
			href={getGameUrl(game)}
			style={{ backgroundColor }}
			{...props}
		>
			{playerGameResults
				.sort((a, b) => a.teamId - b.teamId || sortPlayersStandard(a, b))
				.map(async (result) => {
					const champion = championsByKey.get(result.championKey);
					const championIcon = champion && (await getChampionIcon(champion.id));
					const player = players?.find(
						({ id }) =>
							id ===
							accounts?.find(({ puuid }) => puuid === result.puuid)?.playerId
					);

					return (
						<div key={result.id}>
							{champion && championIcon && (
								<Image
									alt={`${champion.name} icon.`}
									src={championIcon}
									width={128}
									height={128}
								/>
							)}
							<h3>{`${result.kills.toString()}/${result.deaths.toString()}/${result.assists.toString()}`}</h3>
							{player ? (
								<p>{player.displayName ?? player.name}</p>
							) : (
								<p>{result.name}</p>
							)}
						</div>
					);
				})}
		</a>
	);
}
