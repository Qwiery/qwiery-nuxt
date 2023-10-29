import path from "path";
import Qwiery from "~/utils/qwiery/lib/qwiery";

// ============================================================;
// Sqlite graph adapter
// ============================================================;
import Sqlite from "~/utils/qwiery-sqlite/lib/index.js";

Qwiery.plugin(Sqlite);
let filePath = path.join(process.cwd(), "data.sqlite");
// console.log("Data path >>", filePath);
// const q = new Qwiery({
// 	adapters: ["sqlite"],
// 	sqlite: {
// 		dialect: "sqlite",
// 		storage: filePath,
// 	},
// });
console.log("Qwiery backend with JsonGraphStore adapter enabled.");

const q = new Qwiery({
	adapters: ["memory"],
	memory: {
		autoSave: true,
		interval: 5000,
	},
});
export { q as GraphDB };
