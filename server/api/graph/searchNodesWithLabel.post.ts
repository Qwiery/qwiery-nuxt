import { GraphDB } from "./graphDB";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	return await GraphDB.searchNodesWithLabel(body.term, body.fields || [], body.label, body.amount || 100);
});
