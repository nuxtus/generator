import {
	AuthenticationClient,
	DirectusClient,
	RestClient,
	authentication,
	createDirectus,
	readCollections,
	rest,
	staticToken,
} from "@directus/sdk"
import { createPage, deletePage } from "./pages"

import Chalk from "chalk"
import { createTypes } from "./types"
import { login } from "./login"
import { nanoid } from "nanoid"

export type Schema = {} // TODO: Not sure we actually will every use the Schema

export type Directus = DirectusClient<Schema> &
	AuthenticationClient<Schema> &
	RestClient<Schema>

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
			console.log(this.chalk.red("No .env file found."))
			console.log()
			console.log(
				this.chalk.bold("Please add a .env file with the following content:")
			)
			console.log("DIRECTUS_URL=https://example.com/api")
			console.log("NUXTUS_DIRECTUS_EMAIL=admin@example.com")
			console.log("NUXTUS_DIRECTUS_PASSWORD=password")
			console.log()

			throw new Error("No .env file found.")
		}

		this.directus = createDirectus(
			process.env.DIRECTUS_URL || "http://localhost:8055"
		)
			.with(rest())
			.with(authentication())
		// .with(staticToken(<TOKEN GOES HERE>))

		this.login()
	}

	public async login(): Promise<void> {
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
		await this.login() // Need to be logged in as admin to get all collections
		await createTypes(this.directus, this.chalk)
	}

	public async getCollections(): Promise<unknown> {
		// TODO: THis return type is not unknown!
		return this.directus.request(readCollections())
	}

	// public async generateStaticToken(): Promise<unknown> {
	// 	await this.login()
	// 	const token = {
	// 		token: nanoid(),
	// 	}
	// 	this.directus.users.me.update(token)
	// 	return token
	// }
}
