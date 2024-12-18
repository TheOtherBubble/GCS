import "./src/scripts/env";
import { defineConfig } from "drizzle-kit";

const url = process.env["POSTGRES_URL"];
if (!url) {
	throw new Error("Missing required environment variable.");
}

export default defineConfig({
	dbCredentials: { url },
	dialect: "postgresql",
	out: "./drizzle",
	schema: "./src/db/schema.ts"
});
