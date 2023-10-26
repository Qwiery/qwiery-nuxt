import path from "path";
import Qwiery from "~/utils/qwiery/lib/qwiery";

// ============================================================;
// Sqlite graph adapter
// ============================================================;
import Sqlite from "~/utils/qwiery-sqlite/lib/index.js";
Qwiery.plugin(Sqlite);
let filePath = path.join(process.cwd(), "data.sqlite");
console.log("Data path >>", filePath);
const q = new Qwiery({
	adapters: ["sqlite"],
	sqlite: {
		dialect: "sqlite",
		storage: filePath,
	},
});

export { q as GraphDB };
