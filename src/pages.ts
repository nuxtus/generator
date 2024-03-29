import * as fs from "fs"
import * as path from "path"

import camelcase from "camelcase"
import chalk from "chalk"
import { fileURLToPath } from "url"
import nunjucks from "nunjucks"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const toCamelCase = (e: string) => {
	return camelcase(e).substring(0, 1).toUpperCase() + e.substring(1)
}

function createSingletonPage(
	pageName: string,
	env: nunjucks.Environment,
	localChalk: typeof chalk | undefined = undefined
): void {
	const pageFolder = path.join("pages", pageName)
	try {
		fs.mkdirSync(pageFolder)
	} catch (err: any) {
		showError(err.message, localChalk)
		throw err
	}
	const pageFile = path.join(pageFolder, `index.vue`)
	const indexContent: string = env.render("singleton.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(pageFile, indexContent)
	return
}

function showError(
	error: string,
	localChalk: typeof chalk | undefined = undefined
): void {
	if (localChalk) {
		console.error(localChalk.red(error))
		return
	}
	console.error(error)
}

export function deletePage(
	pageName: string,
	localChalk: typeof chalk | undefined = undefined
): void {
	const pageFolder = path.join("pages", pageName)
	try {
		fs.rmSync(pageFolder, { recursive: true })
	} catch (err: any) {
		showError(err.message, localChalk)
		throw err
	}
}

export function createPage(
	pageName: string,
	isSingleton: boolean,
	localChalk: typeof chalk | undefined = undefined
): void {
	let templateFolder = path.join(__dirname, "templates")
	if (!fs.existsSync(templateFolder)) {
		templateFolder = path.join(
			process.cwd(),
			"node_modules",
			"@nuxtus",
			"generator",
			"dist",
			"templates"
		)
	}

	const env: nunjucks.Environment = nunjucks.configure(templateFolder, {
		tags: {
			blockStart: "<%",
			blockEnd: "%>",
			variableStart: "{$",
			variableEnd: "$}",
			commentStart: "<#",
			commentEnd: "#>",
		},
	})
	env.addFilter("camelcase", toCamelCase)
	if (!fs.existsSync("pages")) {
		fs.mkdirSync("pages")
	}
	if (isSingleton) {
		return createSingletonPage(pageName, env, localChalk)
	}
	const pageFolder = path.join("pages", pageName)
	try {
		fs.mkdirSync(pageFolder)
	} catch (err: any) {
		showError(err.message, localChalk)
		throw err
	}

	const indexFile = path.join(pageFolder, "index.vue")
	const individualFile = path.join(pageFolder, "[id].vue")
	const indexContent: string = env.render("index.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(indexFile, indexContent)
	const itemContent: string = env.render("individual.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(individualFile, itemContent)
}
