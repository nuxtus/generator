import { afterEach, assert, expect, test } from "vitest"

import { createPage } from "../src/index"
import fs from "node:fs"
import path from "node:path"

afterEach(() => {
	const pageFolder = path.join("pages", "test")
	fs.rmdirSync(pageFolder, { recursive: true })
	const pageFolder2 = path.join("pages", "test2")
	fs.rmdirSync(pageFolder2, { recursive: true })
})

test("Create collection pages", () => {
	createPage("test", false)
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
