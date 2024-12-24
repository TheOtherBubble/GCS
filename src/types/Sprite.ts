/**
 * Sprite/icon image data from Data Dragon.
 * @public
 */
export default interface Sprite {
	/** The name of the full icon image file. */
	full: string;

	/** The name of the sprite sheet image file. */
	sprite: string;

	/** The type of the sprite. */
	group: string;

	/** The horizontal coordinate of the sprite. */
	x: number;

	/** The vertical coordinate of the sprite. */
	y: number;

	/** The width of the sprite. */
	w: number;

	/** The height of the sprite. */
	h: number;
}
