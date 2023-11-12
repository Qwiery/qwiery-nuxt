import { GraphDB } from "./graphDB";

/**
 * Gets a node.
 */
export default defineEventHandler(async (event) => {
	return await GraphDB.getNodeLabels();
});
