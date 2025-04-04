import type AvatarDecorationData from "./AvatarDecorationData";
import type User from "./User";

/**
 * A Discord guild member.
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object | Guild Member Object}
 * @public
 */
export default interface GuildMember {
	/** The user this guild member represents. */
	user?: User;

	/** The guild user's nickname. */
	nick?: string | null;

	/** The member's guild avatar hash. */
	avatar?: string | null;

	/** The member's guild banner hash. */
	banner?: string | null;

	/** The member's role IDs. */
	roles: string[];

	/** When the user joined the guild. */
	joined_at: string;

	/** When the user started boosting the guild. */
	premium_since?: string | null;

	/** Whether or not the user is deafened in voice channels. */
	deaf: boolean;

	/** Whether or not the user is muted in voice channels. */
	mute: boolean;

	/** Guild member flags. */
	flags: number;

	/** Whether or not the user has passed the guild's membership screening requirements. */
	pending?: boolean;

	/** The total permissions of the member in the channel. */
	permissions?: string;

	/** When the user's timeout will expire. */
	communication_disabled_until?: string | null;

	/** Data for te member's guild avatar decoration. */
	avatar_decoration_data?: AvatarDecorationData | null;
}
