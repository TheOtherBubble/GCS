import Form, { type FormProps } from "components/Form";
import type { Account } from "types/db/Account";
import type { Player } from "types/db/Player";
import QueueType from "types/riot/QueueType";
import Submit from "components/Submit";
import createAccounts from "db/createAccounts";
import getAccountByGameName from "riot/getAccountByGameName";
import getAccounts from "db/getAccounts";
import getFormField from "util/getFormField";
import getLeagueEntriesBySummonerId from "riot/getLeagueEntriesBySummonerId";
import getPlayerUrl from "util/getPlayerUrl";
import getSummonerByPuuid from "riot/getSummonerByPuuid";
import hasRiotApiKey from "util/hasRiotApiKey";
import { revalidatePath } from "next/cache";
import updateAccounts from "db/updateAccounts";

/**
 * Properties that can be passed to an add account form.
 * @public
 */
export interface AddAccountFormProps
	extends Omit<FormProps, "action" | "children"> {
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
	return (
		<Form
			action={async (form) => {
				"use server";
				if (!hasRiotApiKey()) {
					return "Missing Riot API key.";
				}

				const [gameName, tagLine] = getFormField(
					form,
					"gameNameAndTagLine",
					true
				).split("#");
				if (!gameName || !tagLine) {
					return "Malformed game name and/or tag line.";
				}

				// Get account details from Riot.
				const accountDto = await getAccountByGameName(gameName, tagLine);

				// Check if the account is already in the database.
				const [existingAccount] = await getAccounts(accountDto.puuid);
				if (existingAccount) {
					// Check if this player already has this account.
					if (existingAccount.playerId === player.id) {
						return void 0;
					}

					// Check if this account is already somebody else's.
					if (existingAccount.isVerified) {
						return "That's somebody else's account!";
					}

					// Otherwise, move the account over to this player.
					await updateAccounts({ playerId: player.id }, accountDto.puuid);
					revalidatePath(getPlayerUrl(player));
					return void 0;
				}

				// Get summoner details from Riot.
				const platform = "NA1";
				const summonerDto = await getSummonerByPuuid(
					accountDto.puuid,
					platform
				);
				const soloLeagueEntry = (
					await getLeagueEntriesBySummonerId(summonerDto.id, platform)
				).find((leagueEntry) => leagueEntry.queueType === QueueType.SOLO);
				if (!soloLeagueEntry) {
					return "Failed to retrieve ranked solo 5v5 league entry.";
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

				await createAccounts({
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
				return void 0;
			}}
			{...props}
		>
			<header>
				<h3>{"Add Account"}</h3>
			</header>
			<p>
				<label>
					{"Game name and tag line"}
					<input
						type="text"
						name="gameNameAndTagLine"
						placeholder="Lakuna#TAU3"
						maxLength={16 + 1 + 5}
						required
					/>
				</label>
			</p>
			<p>
				<Submit value="Add" />
			</p>
		</Form>
	);
}
