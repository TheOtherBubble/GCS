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
export default async function updateAccount({
	puuid,
	region,
	isVerified,
	verifyIcon
}: Pick<
	typeof accountTable.$inferSelect,
	"puuid" | "region" | "isVerified" | "verifyIcon"
>): Promise<void> {
	// Make Riot API calls.
	const summonerDto = await getSummonerByPuuid(puuid, region);
	const leagueEntries = await getLeagueEntriesBySummonerId(
		summonerDto.id,
		region
	);
	const newAccount = await getAccountByPuuid(puuid);

	// Get the solo queue league entry.
	const soloQueueDto = leagueEntries.find(
		({ queueType }) => queueType === QueueType.SOLO
	);

	// Update the data in the database.
	await db
		.update(accountTable)
		.set({
			cacheDate: new Date().toISOString().substring(0, 10),
			isVerified: isVerified || summonerDto.profileIconId === verifyIcon,
			name: newAccount.gameName,
			rank: soloQueueDto?.rank,
			region,
			tagLine: newAccount.tagLine,
			tier: soloQueueDto?.tier
		})
		.where(eq(accountTable.puuid, puuid));
}
