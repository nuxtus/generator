import {
	AuthenticationClient,
	DirectusClient,
	RestClient,
	StaticTokenClient,
	authentication,
	createDirectus,
	readCollections,
	readMe,
	rest,
	staticToken,
	updateUser,
} from "@directus/sdk"
import { createPage, deletePage } from "./pages"

import Chalk from "chalk"
import { createTypes } from "./types"
import { login } from "./login"
import { nanoid } from "nanoid"

export type Schema = {} // TODO: Not sure we actually will every use the Schema

export type Directus = DirectusClient<Schema> &
	RestClient<Schema> &
	(AuthenticationClient<Schema> | StaticTokenClient<Schema>)

export default class Generator {
	chalk = Chalk
	directus: Directus

	constructor(private existingChalk?: typeof Chalk) {
		if (existingChalk !== undefined) {
			this.chalk = existingChalk
		}

		// Check it contains DIRECTUS_URL
		if (
			!process.env.hasOwnProperty("DIRECTUS_URL") ||
			process.env.DIRECTUS_URL === undefined
		) {
			console.error(this.chalk.red("No .env file found."))
			console.error()
			console.error(
				this.chalk.bold("Please add a .env file with the following content:")
			)
			console.error("DIRECTUS_URL=https://example.com/api")
			console.error("NUXTUS_DIRECTUS_ADMIN_EMAIL=admin@example.com")
			console.error("NUXTUS_DIRECTUS_ADMIN_PASSWORD=password")
			console.error()

			throw new Error("No .env file found.")
		}

		this.directus = createDirectus(
			process.env.DIRECTUS_URL || "http://localhost:8055"
		)
			.with(rest())
			.with(authentication())
	}

	public async login(): Promise<void> {
		const staticTokenValue = process.env.NUXTUS_DIRECTUS_STATIC_TOKEN
		if (staticTokenValue) {
			this.directus = createDirectus(
				process.env.DIRECTUS_URL || "http://localhost:8055"
			)
				.with(rest())
				.with(staticToken(staticTokenValue))
			console.warn(
				this.chalk.yellow(
					"Using static token auth. Ensure the token has admin-level permissions for generation operations."
				)
			)
			return
		}
		await login(this.directus, this.chalk)
	}

	public async createPage(
		collectionName: string,
		singleton: boolean
	): Promise<void> {
		createPage(collectionName, singleton, this.chalk)
	}

	public async deletePage(collectionName: string): Promise<void> {
		deletePage(collectionName, this.chalk)
	}

	public async createTypes(): Promise<void> {
		await this.login() // Need to be logged in as admin to get all collections in OAP
		await createTypes(this.directus, this.chalk)
	}

	public async getCollections(): Promise<unknown> {
		await this.login()
		const result: any = await this.directus.request(readCollections())
		return Array.isArray(result) ? result : (result.data || result)
	}

	public async generateStaticToken(): Promise<string> {
		await this.login()
		const token = nanoid()
		const me = await this.directus.request(readMe())
		await this.directus.request(updateUser(me.id, { token }))
		this.directus = createDirectus(
			process.env.DIRECTUS_URL || "http://localhost:8055"
		)
			.with(rest())
			.with(staticToken(token))
		return token
	}
}
