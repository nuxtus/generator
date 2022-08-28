import { AuthResult, Directus, TypeMap } from "@directus/sdk"

import Chalk from "chalk"

export async function login(
	directus: Directus<TypeMap>,
	chalk: typeof Chalk
): Promise<AuthResult> {
	if (Object.hasOwn(process.env, 'NUXT_PUBLIC_DIRECTUS_TOKEN') && process.env.NUXT_PUBLIC_DIRECTUS_TOKEN !== undefined) {
		return {
			access_token: process.env.NUXT_PUBLIC_DIRECTUS_TOKEN,
			expires: Date.now() + 1000 * 60 * 60 * 24 * 365 // An arbitary expiry, Directus static tokens do not expire
		}
	}
	// LOG IN
	const email = process.env.NUXT_PUBLIC_DIRECTUS_EMAIL || ""
	const password = process.env.NUXT_PUBLIC_DIRECTUS_PASSWORD || ""

	try {
		const token = await directus.auth.login({ email, password })
		return token
	} catch (err: any) {
		console.log(
			chalk.red(
				"Cannot login to Directus. Check your .env file and that Directus is running."
			)
		)
		throw new Error("Cannot login to Directus. " + err.message)
	}
}
