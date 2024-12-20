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
export default function Image({
	alt = "",
	src,
	width,
	height,
	...props
}: ImageProps) {
	// Recombine arguments into one object (so that default arguments can be applied).
	const actualProps: ImageProps = {
		alt,
		src: src ?? "",
		...props
	};

	// Apply width if present.
	if (typeof width === "number") {
		actualProps.width = width;
	} else if (width) {
		actualProps.width = parseInt(width, 10);
	}

	// Apply height if present.
	if (typeof height === "number") {
		actualProps.height = height;
	} else if (height) {
		actualProps.height = parseInt(height, 10);
	}

	// Apply default placeholder type unless specified.
	actualProps.placeholder =
		"placeholder" in props ? (props.placeholder ?? "blur") : "blur";

	// Use the default blur image if the source is a URL unless specified.
	if (typeof actualProps.src === "string") {
		actualProps.blurDataURL =
			"blurDataURL" in props
				? props.blurDataURL
				: (defaultBlur.blurDataURL ??
					"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0EWz9DwADNgHTpjJpDQAAAABJRU5ErkJggg=="); // One pixel of pixie powder (the foreground color). TODO: Update to match new branding.
	}

	return <NextImage {...actualProps} />;
}
