import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest"

import fs from "node:fs"
import openapiTS from "openapi-typescript"

// Test open API to typescript conversion
test("Convert open API to Typescript", async () => {
	const openapiJSON = fs.readFileSync("./test/mocks/openapi.json", "utf-8")
	const openapi = JSON.parse(openapiJSON)
	const types = await openapiTS(openapi)
	expect(types).toContain("ItemsTestNuxtus")
})
