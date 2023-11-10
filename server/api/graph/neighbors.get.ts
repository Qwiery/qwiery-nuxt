import { GraphDB } from "./graphDB";

/**
 * Gets a node.
 */
export default defineEventHandler(async (event) => {
	const { id } = getQuery(event);
	if (id) {
		return await GraphDB.getNeighborhood(<any>id);
	}
	return null;
});
