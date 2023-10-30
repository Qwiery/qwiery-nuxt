import { GraphDB } from "./graphDB";

/**
 * Deletes en edge.
 */
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	return await GraphDB.deleteEdge(body.id);
});
