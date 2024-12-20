import NextImage, { type ImageProps as NextImageProps } from "next/image";
import type { JSX } from "react";
import defaultBlur from "./default-blur.png"; // TODO: Update default blur to match new branding. Scale down to 10 pixels.

/**
 * Equivalent to the props that can be passed to a Next.js image or an image element.
 * @public
 */
export type ImageProps = NextImageProps | JSX.IntrinsicElements["img"];

/**
 * Create an image. Automatically applies default styling and configuration.
 * @param props - The properties to pass to the image.
 * @returns The image.
 * @public
 */
export default function Image(props: ImageProps) {
	const { src, alt, width, height, ...remainingProps } = props;

	// Ensure that required properties are present.

	if (!src) {
		throw new Error("Image source is required.");
	}

	if (!alt) {
		throw new Error("Image alternative text is required.");
	}

	const finalProps: ImageProps = { alt, src, ...remainingProps };

	// Exact optional property types.

	if (typeof width === "number") {
		finalProps.width = width;
	} else if (typeof width === "string") {
		finalProps.width = parseInt(width, 10);
	}

	if (typeof height === "number") {
		finalProps.height = height;
	} else if (typeof height === "string") {
		finalProps.height = parseInt(height, 10);
	}

	// Default properties.

	finalProps.placeholder ??= "blur";

	if (typeof finalProps.src === "string") {
		if (!defaultBlur.blurDataURL) {
			throw new Error("Default blur data URL is required.");
		}

		finalProps.blurDataURL ??= defaultBlur.blurDataURL;
	}

	return <NextImage {...finalProps} />;
}
