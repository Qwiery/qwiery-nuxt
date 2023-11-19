import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	return await GraphDB.nodeCount();
});
