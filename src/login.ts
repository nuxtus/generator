import Chalk from "chalk"
import { Directus } from "."

export async function login(
	directus: Directus,
	chalk: typeof Chalk
): Promise<void> {
	// NOTE: This is for generation of pages only so always use admin
	if (
		!("NUXTUS_DIRECTUS_ADMIN_EMAIL" in process.env) ||
		!("NUXTUS_DIRECTUS_ADMIN_PASSWORD" in process.env)
	) {
		console.error(
			"Directus admin NUXTUS_DIRECTUS_ADMIN_EMAIL or NUXTUS_DIRECTUS_ADMIN_PASSWORD not found in .env"
		)
		throw new Error(
			"Directus admin NUXTUS_DIRECTUS_ADMIN_EMAIL or NUXTUS_DIRECTUS_ADMIN_PASSWORD not found in .env"
		)
	}

	// LOG IN
	const email = process.env.NUXTUS_DIRECTUS_ADMIN_EMAIL || ""
	const password = process.env.NUXTUS_DIRECTUS_ADMIN_PASSWORD || ""

	try {
		await directus.login(email, password)
	} catch (err: any) {
		console.error(
			chalk.red(
				"Cannot login to Directus. Check your .env file and that Directus is running."
			)
		)
		throw err
	}
}
