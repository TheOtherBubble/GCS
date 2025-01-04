import type { JSX } from "react";
import getChampion from "riot/getChampion";

/**
 * Properties that can be passed to a list of skins.
 * @public
 */
export interface SkinListProps
	extends Omit<JSX.IntrinsicElements["select"], "children"> {
	/** The ID of the champion to list skins for. */
	championId: string;
}

/**
 * A list of skin names mapped to their numbers.
 * @returns The list.
 * @public
 */
export default async function SkinList({
	championId,
	...props
}: SkinListProps) {
	return (
		<select {...props}>
			{(await getChampion(championId))?.skins.map(({ name, num }) => (
				<option value={num} key={num}>
					{name}
				</option>
			))}
		</select>
	);
}
