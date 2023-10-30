import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	const { name } = getQuery(event);
	return await GraphDB.randomGraph(name?.toString() || "Erdos");
});
