import type { Account } from "types/db/Account";
import Form from "components/Form";
import type { FormProps } from "next/form";
import type { Player } from "types/db/Player";
import QueueType from "types/riot/QueueType";
import Submit from "components/Submit";
import createAccount from "db/createAccount";
import getAccountByGameName from "riot/getAccountByGameName";
import getFormField from "util/getFormField";
import getLeagueEntriesBySummonerId from "riot/getLeagueEntriesBySummonerId";
import getPlayerUrl from "util/getPlayerUrl";
import getSummonerByPuuid from "riot/getSummonerByPuuid";
import { revalidatePath } from "next/cache";
import { useId } from "react";

/**
 * Properties that can be passed to an add account form.
 * @public
 */
export interface AddAccountFormProps extends Omit<FormProps, "action"> {
	/** The player to add the account to. */
	player: Player;

	/** The player's existing accounts. */
	accounts: Account[];
}

/**
 * A form for adding an account.
 * @param props - Properties to pass to the form.
 * @returns The form.
 * @public
 */
export default function AddAccountForm({
	player,
	accounts,
	...props
}: AddAccountFormProps) {
	const gameNameAndTagLineId = useId();

	return (
		<Form
			action={async (form) => {
				"use server";

				const [gameName, tagLine] = getFormField(
					form,
					"gameNameAndTagLine",
					true
				).split("#");
				if (!gameName || !tagLine) {
					throw new Error("Malformed game name and/or tag line.");
				}

				const accountDto = await getAccountByGameName(gameName, tagLine);
				const platform = "NA1";
				const summonerDto = await getSummonerByPuuid(
					accountDto.puuid,
					platform
				);
				const soloLeagueEntry = (
					await getLeagueEntriesBySummonerId(summonerDto.id, platform)
				).find((leagueEntry) => leagueEntry.queueType === QueueType.SOLO);
				if (!soloLeagueEntry) {
					throw new Error("Failed to retrieve ranked solo 5v5 league entry.");
				}

				// Ensure that the profile icon ID to verify the account is not the summoner's current profile icon ID.
				const starterPackMaxId = 28;
				let profileIconIdToVerify = Math.floor(
					Math.random() * (starterPackMaxId + 1)
				);
				if (profileIconIdToVerify === summonerDto.profileIconId) {
					profileIconIdToVerify =
						(profileIconIdToVerify + 1) % starterPackMaxId;
				}

				await createAccount({
					accountId: summonerDto.accountId,
					gameNameCache: accountDto.gameName,
					isPrimary: accounts.length ? void 0 : true,
					playerId: player.id,
					profileIconIdToVerify,
					puuid: summonerDto.puuid,
					rankCache: soloLeagueEntry.rank,
					region: platform,
					summonerId: summonerDto.id,
					tagLineCache: accountDto.tagLine,
					tierCache: soloLeagueEntry.tier
				});
				revalidatePath(getPlayerUrl(player));
			}}
			{...props}
		>
			<header>
				<h2>{"Add Account"}</h2>
			</header>
			<label htmlFor={gameNameAndTagLineId}>{"Game name and tag line"}</label>
			<input
				type="text"
				id={gameNameAndTagLineId}
				name="gameNameAndTagLine"
				placeholder="Lakuna#TAU3"
				maxLength={16 + 1 + 5}
				required
			/>
			<Submit value="Add" />
		</Form>
	);
}
