/**
 * League of Legends platform routing values.
 * @see {@link https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values | Platform Routing Values}
 * @public
 */
enum Platform {
	/** Brazil. */
	BR1 = "BR1",

	/** Europe Nordic and East. */
	EUN1 = "EUN1",

	/** Europe West. */
	EUW1 = "EUW1",

	/** Japan. */
	JP1 = "JP1",

	/** Republic of Korea. */
	KR = "KR",

	/** Latin America North. */
	LA1 = "LA1",

	/** Latin America South. */
	LA2 = "LA2",

	/** Middle East. Not documented anywhere, but listed among various APIs' regions. */
	ME1 = "ME1",

	/** North America. */
	NA1 = "NA1",

	/** Oceania. */
	OC1 = "OC1",

	/** The Phillipines. Not documented anywhere, but listed among various APIs' regions. Merged into `SG2`. */
	PH2 = "PH2",

	/** Russia. */
	RU = "RU",

	/** Singapore, Malaysia, and Indonesia. Merged from `TH2` and `PH2`. */
	SG2 = "SG2",

	/** Thailand. Not documented anywhere, but listed among various APIs' regions. Merged into `SG2`. */
	TH2 = "TH2",

	/** Turkey. */
	TR1 = "TR1",

	/** Taiwan, Hong Kong, and Macao. */
	TW2 = "TW2",

	/** Vietnam. */
	VN2 = "VN2",

	/** Public Beta Environment. Not documented anywhere. */
	PBE = "PBE"
}

export default Platform;
