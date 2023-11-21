import { GraphDB } from "./graphDB";
import { FetchError } from "ofetch";

/**
 * Gets a node.
 */
export default defineEventHandler(async (event) => {
	try {
		return await GraphDB.getNodeLabels();
	} catch (err) {
		throw createError({
			statusCode: 500,
			message: err.message,
			data: {
				statusCode: (err as FetchError).response?.status,
				responseBody: (err as FetchError).data,
			},
		});
	}
});
