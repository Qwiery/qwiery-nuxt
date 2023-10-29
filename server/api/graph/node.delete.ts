import { GraphDB } from "./graphDB";

/**
 * Creates a node.
 */
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	return await GraphDB.deleteNode(body.id);
});
