import { GraphDB } from "./graphDB";
export default defineEventHandler(async (event) => {
	const { term, fields, amount } = getQuery(event);
	return await GraphDB.searchNodes(<any>term, <any>fields || ["name"], <any>amount || 100);
});
