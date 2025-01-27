/**
 * Regions in which providers can run tournaments.
 * @public
 */
enum Region {
	/** North America. */
	NORTH_AMERICA = "NA",

	/** Brazil. */
	BRAZIL = "BR",

	/** Central America. */
	LATIN_AMERICA_NORTH = "LAN",

	/** South America. */
	LATIN_AMERICA_SOUTH = "LAS",

	/** Korea. */
	KOREA = "KR",

	/** Japan. */
	JAPAN = "JP",

	/** Eastern Europe. */
	EUROPE_NORDIC_AND_EAST = "EUNE",

	/** Western Europe. */
	EUROPE_WEST = "EUW",

	/** The Middle East. Can't be used with the tournament or tournament stub APIs. */
	MIDDLE_EAST = "ME1",

	/** Turkey. */
	TURKEY = "TR",

	/** Russia. */
	RUSSIA = "RU",

	/** Oceania. */
	OCEANIA = "OCE",

	/** The Philippines. Can't be used with the tournament or tournament stub APIs. */
	PHILIPPINES = "PH2",

	/** Singapore, Malaysia, and Indonesia. Can't be used with the tournament or tournament stub APIs. */
	SINGAPORE = "SG2",

	/** Thailand. Can't be used with the tournament or tournament stub APIs. */
	THAILAND = "TH2",

	/** Taiwan, Hong Kong, and Macao. Can't be used with the tournament or tournament stub APIs. */
	TAIWAN = "TW2",

	/** Vietnam. Can't be used with the tournament or tournament stub APIs. */
	VIETNAM = "VN2",

	/** The Public Beta Environment. Can't be used with most APIs. */
	PUBLIC_BETA_ENVIRONMENT = "PBE"
}

export default Region;
