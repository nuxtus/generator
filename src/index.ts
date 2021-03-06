import { AuthResult, Directus, Item, ManyItems, TypeMap } from "@directus/sdk"

import Chalk from "chalk"
import { createPage } from "./pages"
import { createTypes } from "./types"
import { login } from "./login"

export default class Generator {
	chalk = Chalk
	authToken: AuthResult | null = null
	directus: Directus<TypeMap>

	constructor(private existingChalk?: typeof Chalk) {
		if (existingChalk !== undefined) {
			this.chalk = existingChalk
		}
		// Check it contains DIRECTUS_URL
		if (
			!process.env.hasOwnProperty("DIRECTUS_URL") ||
			process.env.DIRECTUS_URL === undefined
		) {
			console.log(this.chalk.red("No .env file found."))
			console.log()
			console.log(
				this.chalk.bold("Please add a .env file with the following content:")
			)
			console.log("DIRECTUS_URL=https://example.com/api")
			console.log("DIRECTUS_TOKEN=123456789")
			console.log("NUXT_PUBLIC_DIRECTUS_EMAIL=admin@test.com")
			console.log("NUXT_PUBLIC_DIRECTUS_PASSWORD=password")
			console.log()

			throw new Error("No .env file found.")
		}
		this.directus = new Directus(
			process.env.DIRECTUS_URL || "http://localhost:3000"
		)
	}

	public async login(): Promise<void> {
		if (!this.validLogin()) {
			this.authToken = await login(this.directus, this.chalk)
		}
	}

	private validLogin(): boolean {
		if (this.authToken === null) {
			return false
		}
		if (this.authToken.expires < Date.now()) {
			return false
		}
		return true
	}

	public async createPage(
		collectionName: string,
		singleton: boolean
	): Promise<void> {
		createPage(collectionName, singleton, this.chalk)
	}

	public async createTypes(): Promise<void> {
		await this.login()
		await createTypes(this.directus, this.chalk)
	}

	public async getCollections(): Promise<ManyItems<Item>> {
		await this.login()
		return this.directus.collections.readAll()
	}
}
