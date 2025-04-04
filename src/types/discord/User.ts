import type AvatarDecorationData from "./AvatarDecorationData";

/**
 * A Discord user.
 * @see {@link https://discord.com/developers/docs/resources/user#user-object | User Object}
 * @public
 */
export default interface User {
	/** The user's ID. */
	id: string;

	/** The user's username. */
	username: string;

	/** The user's Discord tag. */
	discriminator: string;

	/** The user's display name. */
	global_name: string | null;

	/** The user's avatar hash. */
	avatar: string | null;

	/** Whether or not the user belongs to an OAuth2 application. */
	bot?: boolean;

	/** Whether or not the user is an Official Discord System user. */
	system?: boolean;

	/** Whether or not the user has two factor authentication enabled on their account. */
	mfa_enabled?: boolean;

	/** The user's banner hash. */
	banner?: string | null;

	/** The user's banner color encoded as an integer representation of a hexadecimal color code. */
	accent_color?: number | null;

	/** The user's chosen language option. */
	locale?: string;

	/** Whether the email on this account has been verified. */
	verified?: boolean;

	/** The user's email address. */
	email?: string | null;

	/** The flags on the user's account. */
	flags?: number;

	/** The type of Nitro subscription on the user's account. */
	premium_type?: number;

	/** The public flags on the user's account. */
	public_flags?: number;

	/** Data for the user's avatar decoration. */
	avatar_decoration_data?: AvatarDecorationData | null;
}
