import { GraphDB } from "./graphDB";

/**
 * Gets a node.
 */
export default defineEventHandler(async (event) => {
	const { id, amount } = getQuery(event);
	if (id) {
		return await GraphDB.getNeighborhood(<any>id, <number>amount || 10);
	}
	return null;
});
