import path from "path";
import Qwiery from "~/utils/qwiery/lib/qwiery";

// ============================================================;
// Sqlite graph adapter
// ============================================================;
// console.log("Qwiery backend with SQLite adapter enabled.");
// import Sqlite from "~/utils/qwiery-sqlite/lib/index.js";
// Qwiery.plugin(Sqlite);
// let filePath = path.join(process.cwd(), "data.sqlite");
// console.log("Data path >>", filePath);
// const q = new Qwiery({
// 	adapters: ["sqlite"],
// 	sqlite: {
// 		dialect: "sqlite",
// 		storage: filePath,
// 	},
// });
// export { q as GraphDB };

// ============================================================;
// JSON graph adapter
// ============================================================;
console.log("Qwiery backend with JSON adapter enabled.");

const q = new Qwiery({
	adapters: ["memory"],
	memory: {
		autoSave: false,
		interval: 5000,
	},
});
setTimeout(() => {
	q.loadGraph("Food");
}, 500);

export { q as GraphDB };
