import { Directus, TypeMap } from "@directus/sdk"

import Chalk from "chalk"
import fs from "fs"
import openapiTS from "openapi-typescript"

/**
 * Convert Open API spec to type definitions
 */
export async function createTypes(
	directus: Directus<TypeMap>,
	chalk?: typeof Chalk
): Promise<void> {
	if (chalk === undefined) chalk = Chalk
	try {
		const openapi = await directus.server.oas()
		const types = await openapiTS(await openapi)
		if (!fs.existsSync("interfaces")) {
			fs.mkdirSync("interfaces")
		}
		fs.writeFileSync("interfaces/nuxtus.ts", types)
	} catch (err) {
		console.error(chalk.red(`Error creating type interface: ${err}`))
	}
}
