import { GraphDB } from "./graphDB";

/**
 * Deletes a node.
 */
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	console.log(body);
	return await GraphDB.deleteNode(body.id);
});
