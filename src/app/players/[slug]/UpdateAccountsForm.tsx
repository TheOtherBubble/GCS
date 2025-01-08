import Form, { type FormProps } from "components/Form";
import type { Account } from "types/db/Account";
import type { Player } from "types/db/Player";
import QueueType from "types/riot/QueueType";
import Submit from "components/Submit";
import getAccountByPuuid from "riot/getAccountByPuuid";
import getLeagueEntriesBySummonerId from "riot/getLeagueEntriesBySummonerId";
import getPlayerUrl from "util/getPlayerUrl";
import getSummonerByPuuid from "riot/getSummonerByPuuid";
import hasRiotApiKey from "util/hasRiotApiKey";
import { revalidatePath } from "next/cache";
import updateAccount from "db/updateAccount";

/**
 * Properties that can be passed to an update accounts form.
 * @public
 */
export interface UpdateAccountsFormProps extends Omit<FormProps, "action"> {
	/** The player to update the accounts of. */
	player: Player;

	/** The accounts to update. */
	accounts: Account[];
}

/**
 * A form for updating a player's accounts.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default async function UpdateAccountsForm({
	player,
	accounts,
	...props
}: UpdateAccountsFormProps) {
	// Can't call methods on properties passed from the client to the server, so do it here instead.
	const accountDatas = await Promise.all(
		accounts.map(async (account) => {
			const platform = "NA1";
			try {
				const summonerDto = await getSummonerByPuuid(account.puuid, platform);
				const soloQueueDto = (
					await getLeagueEntriesBySummonerId(summonerDto.id, platform)
				).find((leagueEntry) => leagueEntry.queueType === QueueType.SOLO);
				if (!soloQueueDto) {
					throw new Error("Failed to retrieve ranked solo 5v5 league entry.");
				}

				return { account, platform, soloQueueDto, summonerDto };
			} catch {
				return void 0;
			}
		})
	);

	return (
		<Form
			action={async () => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				for (const accountData of accountDatas) {
					if (!accountData) {
						continue;
					}

					const { account, platform, soloQueueDto, summonerDto } = accountData;

					// eslint-disable-next-line no-await-in-loop
					await updateAccount(account.puuid, {
						cacheDate: new Date().toISOString().substring(0, 10),
						// eslint-disable-next-line no-await-in-loop
						gameNameCache: (await getAccountByPuuid(account.puuid)).gameName,
						isVerified:
							account.isVerified ||
							summonerDto.profileIconId === account.profileIconIdToVerify,
						rankCache: soloQueueDto.rank,
						region: platform,
						tagLineCache: account.tagLineCache,
						tierCache: soloQueueDto.tier
					});
				}
				revalidatePath(getPlayerUrl(player));
				return void 0;
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
