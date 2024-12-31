import NextImage, { type ImageProps as NextImageProps } from "next/image";
import defaultBlur from "./assets/default-blur.png"; // TODO: Update default blur to match new branding. Scale down to 10 pixels.

/**
 * Equivalent to the props that can be passed to a Next.js image or an image element.
 * @public
 */
export type ImageProps = NextImageProps & {
	/**
	 * Whether or not the image is trusted. Untrusted images don't use the Next.js image optimization API, so their `src` doesn't need to be a `trustedDomain`.
	 * @see {@link https://nextjs.org/docs/messages/next-image-unconfigured-host | Un-configured host}
	 */
	untrusted?: boolean;
};

/**
 * Create an image. Automatically applies default styling and configuration.
 * @param props - The properties to pass to the image.
 * @returns The image.
 * @public
 */
export default function Image({ untrusted, ...props }: ImageProps) {
	// Untrusted images must use a string `src` value.
	if (untrusted) {
		if (typeof props.src !== "string") {
			throw new Error("Untrusted image must use a string source.");
		}

		// eslint-disable-next-line @next/next/no-img-element
		return <img {...props} alt={props.alt} src={props.src} />;
	}

	// Set default properties.
	props.placeholder ??= "blur";
	if (typeof props.src === "string") {
		if (!defaultBlur.blurDataURL) {
			throw new Error("Default blur data URL is required.");
		}

		props.blurDataURL ??= defaultBlur.blurDataURL;
	}

	return <NextImage {...props} />;
}
