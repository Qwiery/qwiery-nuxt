import Graph from "./graphs/lib/graph";

export default class GraphAPI {
	static async getSchema(): Promise<Graph | null> {
		const { data, pending, error, refresh } = await useFetch("/api/graph/schema", {
			method: "GET",
		});
		const found = <Graph>data.value || null;
		if (found) {
			return Graph.fromJSON(found);
		} else {
			return null;
		}
	}

	static async pathQuery(pathQuery: string[], amount = 1000): Promise<Graph | null> {
		const { data, pending, error, refresh } = await useFetch("/api/graph/pathQuery", {
			method: "POST",
			body: {
				pathQuery,
				amount,
			},
		});
		const found = <Graph>data.value || null;
		if (found) {
			// getting rid of the proxy
			const obj = JSON.parse(JSON.stringify(found));
			return Graph.fromJSON(obj);
		} else {
			return null;
		}
	}
}
