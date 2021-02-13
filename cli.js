#!/usr/bin/env node
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const packageJSONPath = path.join(process.cwd(), "package.json");
const isPackageJSONExist = fs.existsSync(packageJSONPath);
if (!isPackageJSONExist)
	throw new Error("Couldn't find a 'package.json' file 💣");

let packageJSONContent = fs.readFileSync(packageJSONPath, "utf-8");
packageJSONContent = JSON.parse(packageJSONContent);

const dependencies = [];
Object.keys(packageJSONContent?.dependencies)?.map((pac) =>
	dependencies.push(pac)
);

console.log("📜  Installing dev dependencies...");
dependencies.forEach((dep, i) => {
	exec(`npm view @types/${dep}`, (err, stdout) => {
		if (err) return;
		if (stdout && !stdout.includes("DEPRECATED")) {
			exec(`yarn add -D @types/${dep}`, (err) => {
				if (err) return;
			});
		}
	});
});
