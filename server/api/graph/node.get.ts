import { GraphDB } from "./graphDB";

/**
 * Gets a node.
 */
export default defineEventHandler(async (event) => {
	const { id } = getQuery(event);
	if (id) {
		return await GraphDB.getNode(id);
	} else {
		return await GraphDB.getNodes({}, 100);
	}
});
