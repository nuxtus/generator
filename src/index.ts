import * as fs from "fs"
import * as nunjucks from "nunjucks"
import * as path from "path"

import chalk from "chalk"

// process.env.FORCE_COLOR = "true"

function createSingletonPage(
	pageName: string,
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
	const indexContent: string = nunjucks.render("singleton.njk.vue", {
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
	nunjucks.configure(path.join(__dirname, "templates"), {
		tags: {
			blockStart: "<%",
			blockEnd: "%>",
			variableStart: "{$",
			variableEnd: "$}",
			commentStart: "<#",
			commentEnd: "#>",
		},
	})
	if (isSingleton) {
		return createSingletonPage(pageName, localChalk)
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
	const indexContent: string = nunjucks.render("index.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(indexFile, indexContent)
	const itemContent: string = nunjucks.render("individual.njk.vue", {
		collection: pageName,
	})
	fs.writeFileSync(individualFile, itemContent)
}
