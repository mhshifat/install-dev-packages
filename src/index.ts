#! /usr/bin/env node
import { exec } from "child_process";
import fs from "fs";
import path from "path";

let commandStr = "";
const dependencies: string[] = [];
const packageJSON = require(path.join(process.cwd(), "package.json"));

if (Object.keys(packageJSON?.dependencies)?.length) {
	Object.keys(packageJSON.dependencies).forEach((p) => dependencies.push(p));
}

dependencies.forEach((dep) => {
	const tsPackageName = `@types/${dep}`;
	if (!fs.existsSync(path.join(process.cwd(), "node_modules", tsPackageName)))
		commandStr += `${tsPackageName} `;
});

if (commandStr.length) {
	console.log(`📜  Installing Dev Dependencies...\n`);
	exec(`yarn add -D ${commandStr}`, (err, stdout, stderr) => {
		if (err) return;
		console.log(stdout, stderr);
	});
}
