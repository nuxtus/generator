import Chalk from "chalk"
import { Directus } from "."

export async function login(
	directus: Directus,
	chalk: typeof Chalk
): Promise<void> {
	if (
		Object.hasOwn(process.env, "NUXT_NUXTUS_DIRECTUS_TOKEN") &&
		process.env.NUXT_NUXTUS_DIRECTUS_TOKEN !== undefined
	) {
		directus.setToken(process.env.NUXT_NUXTUS_DIRECTUS_TOKEN)
		return
	}
	// LOG IN
	const email = process.env.NUXT_PUBLIC_NUXTUS_DIRECTUS_EMAIL || ""
	const password = process.env.NUXT_PUBLIC_NUXTUS_DIRECTUS_PASSWORD || ""

	try {
		await directus.login(email, password)
	} catch (err: any) {
		console.log(
			chalk.red(
				"Cannot login to Directus. Check your .env file and that Directus is running."
			)
		)
		throw err
	}
}
