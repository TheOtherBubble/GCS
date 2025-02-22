import db from "db/db";
import { playerTable } from "db/schema";

/**
 * Get a list of player IDs.
 * @public
 */
export const GET = async () =>
	Response.json(
		await db
			.select({
				bgChamp: playerTable.backgroundChampionId,
				bgSkin: playerTable.backgroundSkinNumber,
				bio: playerTable.biography,
				discordId: playerTable.discordId,
				discordName: playerTable.name,
				displayName: playerTable.displayName,
				id: playerTable.id,
				role1: playerTable.primaryRole,
				role2: playerTable.secondaryRole,
				twitchId: playerTable.twitchId,
				youtubeId: playerTable.youtubeId
			})
			.from(playerTable)
	);
