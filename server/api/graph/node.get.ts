import { useRoute } from "vue-router";
import { GraphDB } from "./graphDB";
import * as url from "url";

/**
 * Gets a node.
 */
export default defineEventHandler(async (event) => {
	// const body = await readBody(event);
	// const params = url.parse(req.url as string, true).query;
	const { id } = getQuery(event);
	return await GraphDB.getNode(id);
});
