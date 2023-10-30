import { GraphDB } from "./graphDB";

/**
 * Gets an edge.
 */
export default defineEventHandler(async (event) => {
	const { id } = getQuery(event);
	if (id) {
		return await GraphDB.getEdge(id.toString());
	} else {
		return await GraphDB.getEdges({}, 100);
	}
});
