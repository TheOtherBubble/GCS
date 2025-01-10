import type { Account } from "types/db/Account";
import type { LinkProps } from "./Link";
import type { Player } from "types/db/Player";
import type { PlayerGameResult } from "types/db/PlayerGameResult";
import RankedEmblem from "./RankedEmblem";
import type { TeamPlayer } from "types/db/TeamPlayer";
import getAverageKda from "util/getAverageKda";
import getBackgroundImageUrl from "util/getBackgroundImageUrl";
import getHighestRankedAccount from "util/getHighestRankedAccount";
import getPlayerUrl from "util/getPlayerUrl";
import multiclass from "util/multiclass";
import styles from "./styles/player-card.module.scss";

/**
 * Properties that can be passed to a player card.
 * @public
 */
export interface PlayerCardProps extends Omit<LinkProps, "children" | "href"> {
	/** The player that is represented by the card. */
	player: Player;

	/** The player's accounts. */
	accounts?: Account[];

	/** The player's game results. */
	games?: PlayerGameResult[];

	/** The player's teams. */
	teams?: TeamPlayer[];
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
	style,
	...props
}: PlayerCardProps) {
	const highestRankedAccount = accounts
		? getHighestRankedAccount(...accounts)
		: void 0;
	const backgroundImageUrl = getBackgroundImageUrl(player);
	let finalStyle = style;
	if (backgroundImageUrl) {
		finalStyle ??= {};
		finalStyle.aspectRatio = 3; // Reduce aspect ratio if there is a background image so that more is displayed.
		finalStyle.backgroundImage = `url(${backgroundImageUrl})`;
	}

	return (
		<a
			className={multiclass(className, styles["player-card"])}
			style={finalStyle}
			href={getPlayerUrl(player)}
			{...props}
		>
			<div>
				<h3>
					{player.displayName ?? player.name}
					{highestRankedAccount && (
						<RankedEmblem tier={highestRankedAccount.tierCache} />
					)}
				</h3>
				{games && <p>{`KDA: ${getAverageKda(...games).toFixed(2)}`}</p>}
				{teams && <p>{`Seasons: ${teams.length.toString()}`}</p>}
			</div>
		</a>
	);
}
