import { GraphDB } from "./graphDB";

/**
 * Creates an edge.
 */
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	return await GraphDB.createEdge(body);
});
