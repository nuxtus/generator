import Chalk from "chalk"
import type { Directus } from "."
import fs from "fs"
import openapiTS from "openapi-typescript"
import { readOpenApiSpec } from "@directus/sdk"

/**
 * Convert Open API spec to type definitions
 */
export async function createTypes(
	directus: Directus,
	chalk?: typeof Chalk
): Promise<void> {
	if (chalk === undefined) chalk = Chalk
	try {
		const openapi = await directus.request(readOpenApiSpec())
		const types = await openapiTS(openapi.toString())
		if (!fs.existsSync("interfaces")) {
			fs.mkdirSync("interfaces")
		}
		fs.writeFileSync("interfaces/nuxtus.ts", types)
	} catch (err) {
		console.error(chalk.red(`Error creating type interface: ${err}`))
	}
}
