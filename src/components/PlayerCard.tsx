import type {
	accountsTable,
	playerGameResultsTable,
	playersTable,
	teamsTable
} from "db/schema";
import type { JSX } from "react";
import RankedEmblem from "./RankedEmblem";
import getAverageKda from "utility/getAverageKda";
import getBackgroundImageUrl from "utility/getBackgroundImageUrl";
import getHighestRankedAccount from "utility/getHighestRankedAccount";
import getPlayerUrl from "utility/getPlayerUrl";
import multiclass from "utility/multiclass";
import style from "./styles/player-card.module.scss";

/**
 * Properties that can be passed to a player card.
 * @public
 */
export interface PlayerCardProps
	extends Omit<JSX.IntrinsicElements["a"], "children" | "style" | "href"> {
	/** The player that is represented by the card. */
	player: typeof playersTable.$inferSelect;

	/** The player's accounts. */
	accounts?: (typeof accountsTable.$inferSelect)[];

	/** The player's game results. */
	games?: (typeof playerGameResultsTable.$inferSelect)[];

	/** The player's teams. */
	teams?: (typeof teamsTable.$inferSelect)[];
}

/**
 * A card that displays information about a player.
 * @param props - The properties to pass to the player card.
 * @returns The player card.
 * @public
 */
export default function PlayerCard({
	player,
	accounts,
	games,
	teams,
	className,
	...props
}: PlayerCardProps) {
	const highestRankedAccount = accounts
		? getHighestRankedAccount(accounts)
		: void 0;
	const backgroundImageUrl = getBackgroundImageUrl(player);

	return (
		<a
			className={multiclass(className, style["container"])}
			style={{
				backgroundImage: backgroundImageUrl
					? `url(${backgroundImageUrl})`
					: void 0
			}}
			href={getPlayerUrl(player)}
			{...props}
		>
			<div>
				<h3>
					{player.displayName ?? player.name}
					{highestRankedAccount && (
						<>
							<RankedEmblem
								tier={highestRankedAccount.tierCache}
								className={style["rank"]}
							/>
						</>
					)}
				</h3>
				{games && <p>{`KDA: ${getAverageKda(games).toFixed(2)}`}</p>}
				{teams && <p>{`Seasons: ${teams.length.toString()}`}</p>}
			</div>
		</a>
	);
}
