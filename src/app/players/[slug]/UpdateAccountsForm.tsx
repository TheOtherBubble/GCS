import Form from "components/Form";
import { type JSX } from "react";
import type { Player } from "types/db/Player";
import QueueType from "types/riot/QueueType";
import Submit from "components/Submit";
import getAccountByPuuid from "riot/getAccountByPuuid";
import getAccountsByPlayer from "db/getAccountsByPlayer";
import getLeagueEntriesBySummonerId from "riot/getLeagueEntriesBySummonerId";
import getPlayerUrl from "util/getPlayerUrl";
import getSummonerByPuuid from "riot/getSummonerByPuuid";
import { revalidatePath } from "next/cache";
import updateAccount from "db/updateAccount";

/**
 * Properties that can be passed to an update accounts form.
 * @public
 */
export interface UpdateAccountsFormProps
	extends Omit<JSX.IntrinsicElements["form"], "action"> {
	/** The player to update the accounts of. */
	player: Player;
}

/**
 * A form for updating a player's accounts.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function UpdateAccountsForm({
	player,
	...props
}: UpdateAccountsFormProps) {
	return (
		<Form
			action={async () => {
				"use server";

				const accounts = await getAccountsByPlayer(player);
				for (const account of accounts) {
					// eslint-disable-next-line no-await-in-loop
					const accountDto = await getAccountByPuuid(account.puuid);
					const platform = "NA1";
					// eslint-disable-next-line no-await-in-loop
					const summonerDto = await getSummonerByPuuid(account.puuid, platform);
					const soloLeagueEntry = // eslint-disable-next-line no-await-in-loop
						(await getLeagueEntriesBySummonerId(summonerDto.id, platform)).find(
							(leagueEntry) => leagueEntry.queueType === QueueType.SOLO
						);
					if (!soloLeagueEntry) {
						throw new Error("Failed to retrieve ranked solo 5v5 league entry.");
					}

					// eslint-disable-next-line no-await-in-loop
					await updateAccount(account.puuid, {
						cacheDate: new Date().toISOString().substring(0, 10),
						gameNameCache: accountDto.gameName,
						isVerified:
							account.isVerified ||
							summonerDto.profileIconId === account.profileIconIdToVerify,
						rankCache: soloLeagueEntry.rank,
						region: platform,
						tagLineCache: account.tagLineCache,
						tierCache: soloLeagueEntry.tier
					});
				}
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h2>{"Update Accounts"}</h2>
			</header>
			<Submit value="Update" />
		</Form>
	);
}
