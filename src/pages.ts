import * as fs from "fs"
import * as nunjucks from "nunjucks"
import * as path from "path"

import chalk from "chalk"

const toCamelCase = (e: string) => {
	e = e.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
	return e[0].toUpperCase() + e.slice(1)
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
