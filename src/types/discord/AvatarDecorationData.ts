/**
 * Discord avatar decoration data.
 * @see {@link https://discord.com/developers/docs/resources/user#avatar-decoration-data-object | Avatar Decoration Data Object}
 * @public
 */
export default interface AvatarDecorationData {
	/** The avatar decoration hash. */
	asset: string;

	/** The ID of the avatar decoration's SKU. */
	sku_id: string;
}
