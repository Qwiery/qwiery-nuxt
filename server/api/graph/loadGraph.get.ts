import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	const { name } = getQuery(event);
	if (name) {
		return await GraphDB.loadGraph(name.toString());
	} else {
		await GraphDB.loadGraph("food");
		console.log(await GraphDB.nodeCount());
	}
});
