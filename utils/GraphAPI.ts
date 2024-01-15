import { Graph, INodeBase } from "@orbifold/graphs";
import { Utils } from "@orbifold/utils";
import { GraphAPIBase } from "./GraphAPIBase";
import type { IQwieryNode } from "~/utils/index";
import WebServiceGraphAPI from "~/utils/WebServiceGraphAPI";

const showErrorToast = (error) => Toasts.error(error.value.data.message);
/**
 * The graph API is a thin layer on top of several implementations of the {@link GraphAPIBase} class.
 * If you have a REST service, you can use the {@link WebServiceGraphAPI}.
 * If you wish to connect directly (no middle-tier) to Neo4j, you can use the {@link Neo4jGraphAPI}.
 * This class simply passes the calls to the underlying implementation and allows you to switch between implementations.
 * Doing so means that the UI code does not need to change and you can switch by simply changing the static property {@link GraphAPI.graphAPI}.
 */
export default class GraphAPI implements GraphAPIBase {
	/**
	 * The underlying implementation of the {@link GraphAPIBase} class.
	 * Simply change this property to switch between implementations.
	 * @type {GraphAPIBase}
	 */
	static api: GraphAPIBase = WebServiceGraphAPI;

	//region Nodes
	static async deleteNode(id: string): Promise<void> {
		await GraphAPI.api.deleteNode(id);
	}

	/**
	 * Updates the given node.
	 * @param node {IQwieryNode} Should have at least an id, all the rest (e.g. labels) will be handled by the backend.
	 * @returns {Promise<void>}
	 */
	static async updateNode(node: IQwieryNode): Promise<void> {
		await GraphAPI.api.updateNode(node);
	}

	static async searchNodes(term: string, fields: string[], amount: number = 10): Promise<INodeBase[] | null> {
		return await GraphAPI.api.searchNodes(term, fields, amount);
	}

	static async getNeighborhood(id: string, amount: number = 10): Promise<Graph | null> {
		const data = await GraphAPI.api.getNeighborhood(id, amount);
		if (data.value) {
			return <Graph>data.value;
		} else {
			return null;
		}
	}

	static async getNodesWithLabel(labelName: string, amount: number = 100): Promise<any[] | null> {
		const data = await GraphAPI.api.getNodesWithLabel(labelName, amount);
		if (data.value) {
			return <any[]>data.value;
		} else {
			return null;
		}
	}

	static async searchNodesWithLabel(term: string, fields: string[], label: string, amount: number = 100): Promise<any[] | null> {
		const data = await GraphAPI.api.searchNodesWithLabel(term, fields, label, amount);
		if (data.value) {
			return <any[]>data.value;
		} else {
			return null;
		}
	}

	static async getNodeLabels(): Promise<string[] | null> {
		const data = await GraphAPI.api.getNodeLabels();
		if (error.value) {
			await showErrorToast(error);
			return null;
		} else {
			return <string[]>data.value || null;
		}
	}

	static async getNodeLabelProperties(labelName: string): Promise<string[] | null> {
		const data = await GraphAPI.api.getNodeLabelProperties(labelName);
		return <string[]>data.value || null;
	}

	static async getNode(id: string): Promise<INodeBase | null> {
		const data = await GraphAPI.api.getNode(id);
		return <INodeBase>data.value || null;
	}

	static async createNode(nodeData: any = null, id = null, labels = null): Promise<INodeBase | null> {
		const nodeSpecs = Utils.mergeNodeSpecs(nodeData, id, labels);

		const data = await GraphAPI.api.createNode(nodeSpecs);
		return <INodeBase>data.value || null;
	}

	//endregion

	//region Graph
	static async info(): Promise<string | null> {
		const data = await GraphAPI.api.info();
		return <string>data.value || null;
	}

	/** @inheritdoc */
	static async loadGraph(graphName: string): Promise<void> {
		await GraphAPI.api.loadGraph(graphName);
	}

	/** @inheritdoc */
	static async getSchema(): Promise<Graph | null> {
		const data = await GraphAPI.api.getSchema();
		const found = <Graph>data.value || null;
		if (found) {
			return Graph.fromJSON(found);
		} else {
			return null;
		}
	}

	/** @inheritdoc */
	static async pathQuery(pathQuery: string[], amount = 1000): Promise<Graph | null> {
		const data = await GraphAPI.api.pathQuery(pathQuery, amount);
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

	//region Edges
	/**
	 * Checks whether the edge with the given id exists.
	 * @param id {string} The edge id.
	 * @returns {Promise<boolean>}
	 * @abstract
	 */
	static async edgeExists(id: string): Promise<boolean> {
		return await GraphAPI.api.edgeExists(id);
	}

	/**
	 * Returns the amount of edges, optionally filtered with the specified predicate.
	 * @param predicate {Function|null} An optional predicate.
	 * @returns {Promise<number>}
	 * @abstract
	 */
	static async edgeCount(predicate: Function | null = null): Promise<number> {
		return await GraphAPI.api.edgeCount(predicate);
	}

	/**
	 * Creates an edge.
	 * @param sourceId {string} The id of the source node.
	 * @param targetId
	 * @param data
	 * @param id
	 * @param labels {string[]|null} One or more labels.
	 * @returns {*}
	 * @abstract
	 */
	static async createEdge(sourceId: string, targetId = null, data = null, id = null, labels: string[] | null = null): any {
		return await GraphAPI.api.createEdge(sourceId, targetId, data, id, labels);
	}

	/**
	 * Deletes the edge with the specified id.
	 * @param id {string} The edge id.
	 * @returns {Promise<void>}
	 * @abstract
	 */
	static async deleteEdge(id: string): Promise<void> {
		return await GraphAPI.api.deleteEdge(id);
	}

	/**
	 * Updates an edge.
	 * @param data {*} The payload.
	 * @param id? {string} The edge id.
	 * @param labels?
	 * @returns {*}
	 * @abstract
	 */
	static async updateEdge(data: any, id = null, labels = null): any {
		return GraphAPI.api.updateEdge(data, id, labels);
	}

	/**
	 * Upserts an edge.
	 * @param data {*} The payload.
	 * @param id? {string} The edge id.
	 * @param labels?
	 * @returns {*}
	 * @abstract
	 */
	static async upsertEdge(data: any, id = null, labels = null): any {
		return GraphAPI.api.upsertEdge(data, id, labels);
	}

	/**
	 * Returns the edge with the specified id.
	 * @param id {string|function|*} The node id or a Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @returns {*}
	 * @abstract
	 */
	static async getEdge(id: string | Function | any): any {
		return GraphAPI.api.getEdge(id);
	}

	/**
	 * Returns the edges between the specified endpoints.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static async getEdgesBetween(sourceId: string, targetId: string, amount: number = 10): Promise<any[]> {
		return GraphAPI.api.getEdgesBetween(sourceId, targetId, amount);
	}

	/**
	 * Returns the (first) edge between the specified endpoints.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static async getEdgeBetween(sourceId: string, targetId: string): Promise<any[]> {
		return GraphAPI.api.getEdgeBetween(sourceId, targetId);
	}

	/**
	 * Returns the edge between the given endpoints and the specified label.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param label {string} The label.
	 * @returns {Promise<*>}
	 * @abstract
	 */
	static async getEdgeWithLabel(sourceId: string, targetId: string, label: string): Promise<any> {
		return GraphAPI.api.getEdgeWithLabel(sourceId, targetId, label);
	}

	/**
	 * Returns the edges with the specific label.
	 * @param label {string} A label.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static async getEdgesWithLabel(label: string, amount: number = 1000): Promise<any[]> {
		return GraphAPI.api.getEdgesWithLabel(label, amount);
	}

	/**
	 * Returns the edges satisfying the given predicate.
	 * @param predicate {function|*} A Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static async getEdges(predicate: Function | any, amount = 1000): Promise<any[]> {
		return GraphAPI.api.getEdges(predicate, amount);
	}

	/**
	 * This is a utility method to fetch the edges to the children of the specified node.
	 * This method should typically not be overriden by adapter implementations.
	 * @param sourceId
	 * @param amount
	 * @returns {Promise<*>}
	 * @abstract
	 */
	static async getDownstreamEdges(sourceId: string, amount = 1000): Promise<any> {
		return GraphAPI.api.getDownstreamEdges(sourceId, amount);
	}

	/**
	 * Returns the edges pointing at the node with the given id.
	 * @param targetId {string}
	 * @param amount {number}
	 */
	static async getUpstreamEdges(targetId: string, amount: number = 1000): Promise<any> {
		return GraphAPI.api.getUpstreamEdges(targetId, amount);
	}

	/**
	 * Fetches all the labels across all edges.
	 * @return {Promise<string>}
	 */
	static async getEdgeLabels(): Promise<string> {
		return GraphAPI.api.getEdgeLabels();
	}

	//endregion
}
