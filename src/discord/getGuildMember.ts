import "util/env";
import type DiscordError from "types/discord/DiscordError";
import type GuildMember from "types/discord/GuildMember";

/**
 * Get details about a Discord guild member.
 * @param memberId - The member's snowflake.
 * @param guildId - The guild's snowflake.
 * @param token - The Discord bot token to use.
 * @returns The guild member details if the user is a member of the guild.
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-member | Get Guild Member}
 * @throws `Error` if the Discord bot token is missing.
 * @public
 */
export default async function getGuildMember(
	memberId: string,
	guildId = "1290828335412412569",
	token = process.env["DISCORD_BOT_TOKEN"]
): Promise<GuildMember | undefined> {
	if (!token) {
		throw new Error("Missing Discord bot token.");
	}

	const body = (await (
		await fetch(
			`https://discord.com/api/guilds/${guildId}/members/${memberId}`,
			{ headers: { Authorization: `Bot ${token}` } }
		)
	).json()) as GuildMember | DiscordError;

	return "code" in body ? void 0 : body;
}
