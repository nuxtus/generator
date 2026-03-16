import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest"

import fs from "node:fs"
import openapiTS, { astToString } from "openapi-typescript"

// Test open API to typescript conversion
test("Convert open API to Typescript", async () => {
	const openapiJSON = fs.readFileSync("./test/mocks/openapi.json", "utf-8")
	const openapi = JSON.parse(openapiJSON)
	const ast = await openapiTS(openapi)
	const types = astToString(ast)
	expect(types).toContain("ItemsTestNuxtus")
})
