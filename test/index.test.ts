import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest"

import Generator from "../src/index"
import fs from "node:fs"

let nuxtus: Generator
const envBackup = process.env

beforeAll(() => {
	process.env = {
		DIRECTUS_URL: "https://example.com/api",
	}

	vi.mock("@directus/sdk", () => {
		const Directus = vi.fn()
		Directus.prototype.auth = {
			login: vi.fn().mockImplementation(() => {
				return {
					expires: Date.now() + 100000,
				}
			}),
		}
		Directus.prototype.users = {
			me: {
				update: vi.fn().mockImplementation(() => {
					return {
						token: "123456789",
					}
				}),
			}
		},
		Directus.prototype.server = {
			oas: vi.fn().mockImplementation(() => {
				return {
					openapi: "3.0.0",
					components: {},
				}
			}),
		}

		return { Directus }
	})

	nuxtus = new Generator()
})

afterEach(() => {
	if (fs.existsSync("pages")) {
		fs.rmSync("pages", { recursive: true })
	}
	if (fs.existsSync("interfaces")) {
		fs.rmSync("interfaces", { recursive: true })
	}
})

afterAll(() => {
	process.env = envBackup
})

test("Create collection pages", async () => {
	fs.mkdirSync("pages")
	await nuxtus.createPage("test", false)
	expect(fs.existsSync("pages/test")).toBe(true)
	expect(fs.existsSync("pages/test/index.vue")).toBe(true)
	const indexPage = fs.readFileSync("pages/test/index.vue")
	expect(indexPage.includes('collection: "test",')).toBe(true)
	expect(indexPage.includes(`const { getItems } = useDirectusItems();`)).toBe(
		true
	)
	const individualPage = fs.readFileSync("pages/test/[id].vue")
	expect(individualPage.includes('collection: "test",')).toBe(true)
	expect(
		individualPage.includes("const { getItemById } = useDirectusItems()")
	).toBe(true)
})

test("Create singleton page", async () => {
	fs.mkdirSync("pages")
	await nuxtus.createPage("test2", true)
	expect(fs.existsSync("pages/test2/index.vue")).toBe(true)
	const indexPage = fs.readFileSync("pages/test2/index.vue")
	expect(indexPage.includes('collection: "test2"')).toBe(true)
	expect(
		indexPage.includes(` const { getSingletonItem } = useDirectusItems();`)
	).toBe(true)
})

test("Delete collection pages", async () => {
	fs.mkdirSync("pages")
	await nuxtus.createPage("test3", true)
	await nuxtus.deletePage("test3")
	expect(fs.existsSync("pages/test3")).toBe(false)
})

test("create types", async () => {
	fs.mkdirSync("interfaces")
	await nuxtus.createTypes()
	expect(fs.existsSync("interfaces/nuxtus.ts")).toBe(true)
	const typeFile = fs.readFileSync("interfaces/nuxtus.ts")
	expect(typeFile.includes("export type paths = Record<string, never>;")).toBe(true)
})

test("create token", async () => {
	const authUser = await nuxtus.generateStaticToken()
	expect(authUser.token).toBeDefined()
})
