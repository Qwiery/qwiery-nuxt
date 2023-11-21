import Graph from "./graphs/lib/graph";
import type INodeBase from "./graphs/lib/iNodeBase";
import { Utils } from "./utils/lib/utils";
import { GraphAPIBase } from "./GraphAPIBase";
import type { IQwieryNode } from "~/utils/index";
const showErrorToast = (error) => Toasts.error(error.value.data.message);
/**
 * The graph API is a proxy to the REST service.
 * It's the default implementation of {@link GraphAPIBase}
 */
export default class GraphAPI implements GraphAPIBase {
	//region Nodes
	static async deleteNode(id: string): Promise<void> {
		await useFetch("/api/graph/node", {
			method: "DELETE",
			body: {
				id,
			},
		});
	}

	/**
	 * Updates the given node.
	 * @param node {IQwieryNode} Should have at least an id, all the rest (e.g. labels) will be handled by the backend.
	 * @returns {Promise<void>}
	 */
	static async updateNode(node: IQwieryNode): Promise<void> {
		await useFetch("/api/graph/node", {
			method: "PATCH",
			body: {
				data: node,
			},
		});
	}

	static async searchNodes(term: string, fields: string[], amount: number = 10): Promise<INodeBase[] | null> {
		const { data, pending, error, refresh } = await useFetch("/api/graph/searchNodes", {
			method: "POST",
			body: {
				term,
				fields,
				amount,
			},
		});
		return <INodeBase[]>data.value || null;
	}

	static async getNeighborhood(id: string, amount: number = 10): Promise<Graph | null> {
		const { data, pending, error, refresh } = await useFetch(`/api/graph/neighbors?id=${id}&amount=${amount}`, {
			method: "GET",
		});
		if (data.value) {
			return <Graph>data.value;
		} else {
			return null;
		}
	}

	static async getNodesWithLabel(labelName: string, amount: number = 100): Promise<any[] | null> {
		const { data, pending, error, refresh } = await useFetch(`/api/graph/nodesWithLabel?labelName=${labelName}`, {
			method: "GET",
		});
		if (data.value) {
			return <any[]>data.value;
		} else {
			return null;
		}
	}

	static async searchNodesWithLabel(term: string, fields: string[], label: string, amount: number = 100): Promise<any[] | null> {
		const { data, pending, error, refresh } = await useFetch(`/api/graph/searchNodesWithLabel`, {
			method: "POST",
			body: {
				term,
				fields,
				label,
				amount,
			},
		});
		if (data.value) {
			return <any[]>data.value;
		} else {
			return null;
		}
	}

	static async getNodeLabels(): Promise<string[] | null> {
		const { data, pending, error, refresh } = await useFetch("/api/graph/nodeLabels", {
			method: "GET",
		});
		if (error.value) {
			return showErrorToast(error);
		}
		return <string[]>data.value || null;
	}

	static async getNodeLabelProperties(labelName: string): Promise<string[] | null> {
		const { data, pending, error, refresh } = await useFetch(`/api/graph/nodeLabelProperties?labelName=${labelName}`, {
			method: "GET",
		});
		return <string[]>data.value || null;
	}

	static async getNode(id: string): Promise<INodeBase | null> {
		const { data, pending, error, refresh } = await useFetch(`/api/graph/node?id=${id}`, {
			method: "GET",
		});
		return <INodeBase>data.value || null;
	}

	static async createNode(nodeData: any = null, id = null, labels = null): Promise<INodeBase | null> {
		const nodeSpecs = Utils.mergeNodeSpecs(nodeData, id, labels);

		const { data, pending, error, refresh } = await useFetch("/api/graph/node", {
			method: "PUT",
			body: nodeSpecs,
		});
		return <INodeBase>data.value || null;
	}

	//endregion

	//region Graph
	/** @inheritdoc */
	static async loadGraph(graphName: string): Promise<void> {
		const { data, pending, error, refresh } = await useFetch(`/api/graph/loadGraph?graphName=${graphName}`, {
			method: "GET",
		});
	}

	/** @inheritdoc */
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

	/** @inheritdoc */
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
			// getting rid of the proxy would go like
			// const obj = JSON.parse(JSON.stringify(found));
			// return Graph.fromJSON(obj);
			return found;
		} else {
			return null;
		}
	}

	//endregion
}
