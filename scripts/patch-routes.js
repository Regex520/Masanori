import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const routesPath = join(import.meta.dirname, "..", "dist", "_routes.json");
const routes = JSON.parse(readFileSync(routesPath, "utf-8"));

const staticFiles = ["/pagefind/*", "/sitemap-index.xml", "/sitemap-0.xml"];
let added = 0;
for (const file of staticFiles) {
	if (!routes.exclude.includes(file)) {
		routes.exclude.push(file);
		added++;
		console.log(`+ Added ${file} to _routes.json exclude list`);
	}
}
if (added === 0) {
	console.log("+ All static routes already in exclude list");
}
writeFileSync(routesPath, JSON.stringify(routes, null, 2) + "\n");
