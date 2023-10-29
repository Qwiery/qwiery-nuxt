import Graph from "./graphs/lib/graph";

/**
 * The graph API you need to implement/override if the one going to the
 * default is not what you need.
 */
export class GraphAPIBase {
	/**
	 * Clears the graph.
	 * @return {Promise<void>} Does not return anything.
	 */
	static clear(): Promise<void> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Generates pseudo-random graph data.
	 * @param name {string} The name of the algorithm to use.
	 * @param args {*[]} Parameters specific to the algorithm.
	 * @returns {Promise<Graph>} The generated graph.
	 * @abstract
	 */
	static randomGraph(name: string = "Erdos", ...args: any[]): Promise<Graph> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the schema from the existing data as a graph.
	 * The name of the node and edges is the label (class).
	 * @return {Promise<Graph>}
	 * @abstract
	 */
	static inferSchemaGraph(): Promise<Graph> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the inferred schema.
	 * @return {Promise<Graph|null>}
	 */
	static async getSchema(): Promise<Graph | null> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the graph of data matching the given path query.
	 * @param path {string[]}
	 * @param amount {number} The maximum amount to return.
	 * @return  {Promise<Graph>}
	 * @abstract
	 */
	static pathQuery(path: string[], amount: number = 1000): Promise<Graph> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the nodes satisfying the given predicate.
	 * @param predicate {function|*} A Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static getNodes(predicate: Function | any = {}, amount: number = 1000): Promise<any[]> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the nodes with the specified labels.
	 * @param label {string} A label.
	 * @param amount? {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static getNodesWithLabel(label: string, amount = 1000): Promise<any[]> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the node with the specified id.
	 * @param id {string|function|*} The node id or a Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @returns {Promise<*|null>}
	 * @abstract
	 */
	static getNode(id: string | Function | any): Promise<any | null> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Checks whether the node with the specified id exists.
	 * @param id {string} Id of the node.
	 * @returns {Promise<boolean>}
	 * @abstract
	 */
	static nodeExists(id: string): Promise<boolean> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Return the amount of nodes with the specified predicate, if any given.
	 * @param predicate? {function} An optional predicate.
	 * @returns {Promise<number>}
	 * @abstract
	 */
	static nodeCount(predicate = null): Promise<number> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Creates a new node.
	 * @param id? {string} The unique id of the node.
	 * @param data? {*} The payload.
	 * @param labels? {string[]} One or more labels.
	 * @returns {*}
	 * @abstract
	 */
	static createNode(data = null, id = null, labels = null): any {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Creates a sequence of nodes.
	 * @param seq {string[]|*[]} A sequence of node id's or node specs.
	 * @returns {Promise<*[]>} The created nodes.
	 * @abstract
	 */
	static createNodes(seq: string[] | any[]): Promise<any[]> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Deletes the specified node.
	 * @param id {string} The id of the node to delete.
	 * @returns {Promise<void>}
	 * @abstract
	 */
	static deleteNode(id: string): Promise<void> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Flexible deletion of nodes via the given predicate.
	 * @param predicate {function} A predicate function.
	 * @returns {Promise<string[]>} Returns the deleted items.
	 * @abstract
	 */
	static deleteNodes(predicate: Function): Promise<string[]> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Updates a node.
	 * @param data? {*} The payload.
	 * @param id? {string} The id of the node to update or create.
	 * @param labels? {string[]} The labels of the node.
	 * @returns {*}
	 * @abstract
	 */
	static updateNode(data = null, id = null, labels = null): any {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Upserts a node.
	 * @param data? {*} The payload.
	 * @param id? {string} The id of the node to update or create.
	 * @param labels? {string[]} The labels of the node.
	 * @returns {*}
	 * @abstract
	 */
	static upsertNode(data = null, id = null, labels = null): any {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Fetches all the labels across all nodes.
	 * @return {Promise<*>}
	 * @abstract
	 */
	static getNodeLabels(): Promise<any> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Checks whether the edge with the given id exists.
	 * @param id {string} The edge id.
	 * @returns {Promise<boolean>}
	 * @abstract
	 */
	static edgeExists(id: string): Promise<boolean> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the amount of edges, optionally filtered with the specified predicate.
	 * @param predicate {Function|null} An optional predicate.
	 * @returns {Promise<number>}
	 * @abstract
	 */
	static edgeCount(predicate: Function | null = null): Promise<number> {
		throw new Error("Not implemented yet.");
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
	static createEdge(sourceId: string, targetId = null, data = null, id = null, labels: string[] | null = null): any {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Deletes the edge with the specified id.
	 * @param id {string} The edge id.
	 * @returns {Promise<void>}
	 * @abstract
	 */
	static deleteEdge(id: string): Promise<void> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Updates an edge.
	 * @param data {*} The payload.
	 * @param id? {string} The edge id.
	 * @param labels?
	 * @returns {*}
	 * @abstract
	 */
	static updateEdge(data: any, id = null, labels = null): any {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Upserts an edge.
	 * @param data {*} The payload.
	 * @param id? {string} The edge id.
	 * @param labels?
	 * @returns {*}
	 * @abstract
	 */
	static upsertEdge(data: any, id = null, labels = null): any {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the edge with the specified id.
	 * @param id {string|function|*} The node id or a Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @returns {*}
	 * @abstract
	 */
	static getEdge(id: string | Function | any): any {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the edges between the specified endpoints.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static getEdgesBetween(sourceId: string, targetId: string, amount: number = 10): Promise<any[]> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the (first) edge between the specified endpoints.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static getEdgeBetween(sourceId: string, targetId: string): Promise<any[]> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the edge between the given endpoints and the specified label.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param label {string} The label.
	 * @returns {Promise<*>}
	 * @abstract
	 */
	static getEdgeWithLabel(sourceId: string, targetId: string, label: string): Promise<any> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the edges with the specific label.
	 * @param label {string} A label.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static getEdgesWithLabel(label: string, amount: number = 1000): Promise<any[]> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the edges satisfying the given predicate.
	 * @param predicate {function|*} A Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @abstract
	 */
	static getEdges(predicate: Function | any, amount = 1000): Promise<any[]> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * This is a utility method to fetch the edges to the children of the specified node.
	 * This method should typically not be overriden by adapter implementations.
	 * @param sourceId
	 * @param amount
	 * @returns {Promise<*>}
	 * @abstract
	 */
	static getDownstreamEdges(sourceId: string, amount = 1000): Promise<any> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Returns the edges pointing at the node with the given id.
	 * @param targetId {string}
	 * @param amount {number}
	 */
	static getUpstreamEdges(targetId: string, amount: number = 1000): Promise<any> {
		throw new Error("Not implemented yet.");
	}

	/**
	 * Fetches all the labels across all edges.
	 * @return {Promise<string>}
	 */
	static getEdgeLabels(): Promise<string> {
		throw new Error("Not implemented yet.");
	}
}

/**
 * The graph API is a proxy to the REST service.
 * It's the default implementation of {@link GraphAPIBase}
 */
export default class GraphAPI implements GraphAPIBase {
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
}
