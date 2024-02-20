import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest"

import Generator from "../src/index"
import fs from "node:fs"

let nuxtus: Generator
const envBackup = process.env

beforeAll(() => {
	vi.stubEnv("DIRECTUS_URL", "https://example.com/api")
	vi.stubEnv("NUXTUS_DIRECTUS_ADMIN_EMAIL", "admin@example.com")
	vi.stubEnv("NUXTUS_DIRECTUS_ADMIN_PASSWORD", "password")

	vi.mock("@directus/sdk", () => {
		const createDirectus = vi.fn().mockImplementation(() => {
			return {
				with: vi.fn().mockImplementation(() => {
					return {
						with: vi.fn().mockImplementation(() => {
							return {
								login: vi.fn(),
								request: vi.fn().mockImplementation(() => {
									return {
										openapi: "3.0.0",
										components: {},
									}
								}),
								setToken: vi.fn(),
							}
						}),
					}
				}),
			}
		})

		const rest = vi.fn().mockImplementation(() => {
			return {}
		})

		const authentication = vi.fn().mockImplementation(() => {
			return {}
		})

		const readOpenApiSpec = vi.fn()

		return { createDirectus, rest, authentication, readOpenApiSpec }
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
	expect(indexPage.includes("useAsyncData <Test[] | null>")).toBe(true)
	expect(
		indexPage.includes(`return $directus.request($readItems('test', query))`)
	).toBe(true)
	const individualPage = fs.readFileSync("pages/test/[id].vue")
	expect(individualPage.includes("<div>{{ test }}</div>")).toBe(true)
	expect(
		individualPage.includes(
			"return $directus.request($readItem('test', route.params.id, query))"
		)
	).toBe(true)
})

test("Create singleton page", async () => {
	fs.mkdirSync("pages")
	await nuxtus.createPage("test2", true)
	expect(fs.existsSync("pages/test2/index.vue")).toBe(true)
	const indexPage = fs.readFileSync("pages/test2/index.vue")
	expect(
		indexPage.includes("useAsyncData <Test2 | null> ('test2', () => {")
	).toBe(true)
	expect(indexPage.includes(`<h1>Test2</h1>`)).toBe(true)
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
	expect(typeFile.includes("export type paths = Record<string, never>;")).toBe(
		true
	)
})

test("create token", async () => {
	const authUser = await nuxtus.generateStaticToken()
	expect(authUser).toBeDefined()
	expect(authUser).toBeTypeOf("string")
})
