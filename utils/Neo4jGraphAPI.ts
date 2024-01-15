import { Graph, INodeBase } from "@orbifold/graphs";
import { GraphAPI } from "@orbifold/cypher";

import { Utils } from "@orbifold/utils";
import { GraphAPIBase } from "./GraphAPIBase";
import type { IQwieryNode } from "~/utils/index";
import _ from "lodash";

const showErrorToast = (error) => Toasts.error(error.value.data.message);
const api = new GraphAPI();
/**
 * The graph API is a proxy to the REST service.
 * It's the default implementation of {@link GraphAPIBase}
 * If you use Neo4j and wish to connect directly to it without the REST service, you can use the {@link Neo4jGraphAPI}.
 */
export default class Neo4jGraphAPI implements GraphAPIBase {
	//region Nodes
	static async deleteNode(id: string): Promise<void> {
		return await api.deleteNode(id);
	}

	/**
	 * Updates the given node.
	 * @param node {IQwieryNode} Should have at least an id, all the rest (e.g. labels) will be handled by the backend.
	 * @returns {Promise<void>}
	 */
	static async updateNode(node: IQwieryNode): Promise<void> {
		return await api.updateNode(node);
	}

	static async searchNodes(term: string, fields: string[], amount: number = 10): Promise<INodeBase[] | null> {
		return await api.searchNodes(term, fields, amount);
	}

	static async getNeighborhood(id: string, amount: number = 10): Promise<Graph | null> {
		return await api.getNeighborhood(id, amount);
	}

	static async getNodesWithLabel(labelName: string, amount: number = 100): Promise<any[] | null> {
		return await api.getNodesWithLabel(labelName, amount);
	}

	static async searchNodesWithLabel(term: string, fields: string[], label: string, amount: number = 100): Promise<any[] | null> {
		return await api.searchNodesWithLabel(term, fields, label, amount);
	}

	static async getNodeLabels(): Promise<string[] | null> {
		return await api.getNodeLabels();
	}

	static async getNodeLabelProperties(labelName: string): Promise<string[] | null> {
		return await api.getNodeLabelProperties(labelName);
	}

	static async getNode(id: string): Promise<INodeBase | null> {
		return await api.getNode(id);
	}

	static async createNode(nodeData: any = null, id = null, labels = null): Promise<INodeBase | null> {
		return await api.createNode(nodeData, id, labels);
	}

	//endregion

	//region Graph
	static async info(): Promise<string | null> {
		const { data, pending, error, refresh } = await useFetch(`/api/graph/info`, {
			method: "GET",
		});
		return <string>data.value || null;
	}

	/** @inheritdoc */
	static async loadGraph(graphName: string): Promise<void> {
		return await api.loadGraph(graphName);
	}

	/** @inheritdoc */
	static async getSchema(): Promise<Graph | null> {
		return await api.inferSchemaGraph();
	}

	/** @inheritdoc */
	static async pathQuery(pathQuery: string[], amount = 1000): Promise<Graph | null> {
		return await api.pathQuery(pathQuery, amount);
	}

	//endregion
}
