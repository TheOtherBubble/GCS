import * as schema from "./schema";
import { sql as client } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

/**
 * The PostgreSQL database.
 * @public
 */
export default drizzle({ client, schema });
