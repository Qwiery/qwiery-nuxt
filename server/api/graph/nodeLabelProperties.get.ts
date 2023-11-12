import { GraphDB } from "./graphDB";

export default defineEventHandler(async (event) => {
	const { labelName } = getQuery(event);
	if (labelName) {
		return await GraphDB.getNodeLabelProperties(labelName.toString());
	} else {
		return [];
	}
});
