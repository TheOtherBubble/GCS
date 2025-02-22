import QueueType from "types/riot/QueueType";
import { accountTable } from "db/schema";
import db from "db/db";
import { eq } from "drizzle-orm";
import getAccountByPuuid from "riot/getAccountByPuuid";
import getLeagueEntriesBySummonerId from "riot/getLeagueEntriesBySummonerId";
import getSummonerByPuuid from "riot/getSummonerByPuuid";

/**
 * Fetch the newest information for the given account.
 * @param account - The account to update.
 * @returns When finished.
 * @public
 */
export default async function updateAccount(
	account: Pick<
		typeof accountTable.$inferSelect,
		"puuid" | "region" | "isVerified" | "profileIconIdToVerify"
	>
): Promise<void> {
	// Make Riot API calls.
	const summonerDto = await getSummonerByPuuid(account.puuid, account.region);
	const leagueEntries = await getLeagueEntriesBySummonerId(
		summonerDto.id,
		account.region
	);
	const newAccount = await getAccountByPuuid(account.puuid);

	// Get the solo queue league entry.
	const soloQueueDto = leagueEntries.find(
		(leagueEntry) => leagueEntry.queueType === QueueType.SOLO
	);

	// Update the data in the database.
	await db
		.update(accountTable)
		.set({
			cacheDate: new Date().toISOString().substring(0, 10),
			gameNameCache: newAccount.gameName,
			isVerified:
				account.isVerified ||
				summonerDto.profileIconId === account.profileIconIdToVerify,
			rankCache: soloQueueDto?.rank,
			region: account.region,
			tagLineCache: newAccount.tagLine,
			tierCache: soloQueueDto?.tier
		})
		.where(eq(accountTable.puuid, account.puuid));
}
