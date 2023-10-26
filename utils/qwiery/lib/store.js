import errors from "./errors.js";
import _ from "lodash";
import { Utils } from "../../utils/lib/utils.js";
/* istanbul ignore file since this is an interface*/

/*
 * Default in-memory store.
 * */
export default class Store {
	constructor() {
		if (this.constructor === Store) {
			throw new Error(errors.abstractClass("Store"));
		}
		this.id = Utils.id();
		this.name = "Store";
		this.description = "";
	}

	//region Graph

	/**
	 * Clears the data from the store.
	 * @return {Promise<void>}
	 */
	async clear() {
		throw new Error(errors.notImplemented("clear"));
	}
	/**
	 * This is a utility method to fetch the edges to the children of the specified node.
	 * This method should typically not be overridden by adapter implementations.
	 * @param sourceId
	 * @param amount
	 * @returns {Promise<*>}
	 */
	async getDownstreamEdges(sourceId, amount = 1000) {
		throw new Error(errors.notImplemented("getDownstreamEdges"));
	}
	/**
	 * This is a utility method to fetch the edges to the parents of the specified node.
	 * This method should typically not be overridden by adapter implementations.
	 * @param targetId
	 * @param amount
	 * @returns {Promise<*>}
	 */
	async getUpstreamEdges(targetId, amount = 1000) {
		throw new Error(errors.notImplemented("getUpstreamEdges"));
	}

	/**
	 * This returns the schema inferred from the data.
	 * @returns {Promise<Graph>}
	 */
	async inferSchemaGraph() {
		throw new Error(errors.notImplemented("inferSchemaGraph"));
	}

	/**
	 * A path query defines a patter, e.g. ["A",*,"B","knows","C"].
	 * There are only two possibilities:
	 * - an arbitrary edge, meaning all nodes with the label in the next entry
	 * - a specific edge label, the next item has to be *
	 * @param path {string[]} The path query.
	 * @param amount {number} The maximum amount of nodes to return
	 * @return {Promise<Graph>}
	 */
	async pathQuery(path, amount) {
		throw new Error(errors.notImplemented("pathQuery"));
	}

	//endregion

	//region Node
	/**
	 * Returns the nodes satisfying the given predicate.
	 * @param predicate {function} A predicate.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getNodes(predicate, amount = 1000) {
		throw new Error(errors.notImplemented("getNodes"));
	}

	/**
	 * Returns the nodes with the specified labels.
	 * @param label {string} A label.
	 * @param amount? {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getNodesWithLabel(label, amount = 1000) {
		throw new Error(errors.notImplemented("getNodesWithLabel"));
	}

	/**
	 * Returns the node with the specified id.
	 * @param projection {string|function|*} The node id or a Mongo-like projection. If the adapter supports it, a function.
	 * @returns {Promise<*|null>}
	 */
	async getNode(projection) {
		throw new Error(errors.notImplemented("getNode"));
	}

	/**
	 * Checks whether the node with the specified id exists.
	 * @param id {string} Id of the node.
	 * @returns {Promise<boolean>}
	 */
	async nodeExists(id) {
		throw new Error(errors.notImplemented("nodeExists"));
	}

	/**
	 * Return the amount of nodes with the specified predicate, if any given.
	 * @param predicate? {function} An optional predicate.
	 * @returns {Promise<number>}
	 */
	async nodeCount(predicate = null) {
		throw new Error(errors.notImplemented("nodeCount"));
	}

	/**
	 * Creates a new node.
	 * @param id? {string} The unique id of the node.
	 * @param data? {*} The payload.
	 * @param labels? {string[]} One or more labels.
	 * @returns {*}
	 */
	async createNode(data = null, id = null, labels = null) {
		throw new Error(errors.notImplemented("createNode"));
	}

	/**
	 * Creates a sequence of nodes.
	 * @param seq {string[]|*[]} A sequence of node id's or node specs.
	 * @returns {Promise<*[]>} The created nodes.
	 */
	async createNodes(seq) {
		throw new Error(errors.notImplemented("createNode"));
	}

	/**
	 * Deletes the specified node.
	 * @param id {string} The id of the node to delete.
	 * @returns {Promise<void>}
	 */
	async deleteNode(id) {
		throw new Error(errors.notImplemented("deleteNode"));
	}

	/**
	 * Updates a node.
	 * @param data? {*} The payload.
	 * @param id? {string} The id of the node to update or create.
	 * @param labels? {string[]} The labels of the node.
	 * @returns {*}
	 */
	async updateNode(data = null, id = null, labels = null) {
		throw new Error(errors.notImplemented("updateNode"));
	}

	/**
	 * Upserts a node.
	 * @param data? {*} The payload.
	 * @param id? {string} The id of the node to update or create.
	 * @param labels? {string[]} The labels of the node.
	 * @returns {*}
	 */
	async upsertNode(data = null, id = null, labels = null) {
		throw new Error(errors.notImplemented("upsertNode"));
	}

	//endregion

	//region Edge

	/**
	 * Checks whether the edge with the given id exists.
	 * @param id {string} The edge id.
	 * @returns {Promise<boolean>}
	 */
	async edgeExists(id) {
		throw new Error(errors.notImplemented("edgeExists"));
	}

	/**
	 * Creates an edge.
	 * @param sourceId {string} The id of the source node.
	 * @param targetId? {string} The id of the target node.
	 * @param data? {*} The payload.
	 * @param id? {string} The unique id of the edge.
	 * @param labels {string[]} One or more labels.
	 * @returns {*}
	 */
	async createEdge(sourceId, targetId, data = null, id = null, labels = null) {
		throw new Error(errors.notImplemented("createEdge"));
	}

	/**
	 * Deletes the edge with the specified id.
	 * @param id {string} The edge id.
	 * @returns {Promise<void>}
	 */
	async deleteEdge(id) {
		throw new Error(errors.notImplemented("deleteEdge"));
	}

	/**
	 * Updates an edge.
	 * @param data {*} The payload.
	 * @param id? {string} The edge id.
	 * @param labels?
	 * @returns {*}
	 */
	async updateEdge(data, id = null, labels = null) {
		throw new Error(errors.notImplemented("updateEdge"));
	}

	/**
	 * Upserts an edge.
	 * @param data {*} The payload.
	 * @param id? {string} The edge id.
	 * @param labels?
	 * @returns {*}
	 */
	async upsertEdge(data, id = null, labels = null) {
		throw new Error(errors.notImplemented("upsertEdge"));
	}

	/**
	 * Returns the edge with the specified id.
	 * @param id {string} The edge id.
	 * @returns {*}
	 */
	async getEdge(id) {
		throw new Error(errors.notImplemented("getEdge"));
	}

	/**
	 * Returns the edges between the specified endpoints.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getEdgesBetween(sourceId, targetId, amount = 10) {
		throw new Error(errors.notImplemented("getEdgesBetween"));
	}

	/**
	 * Returns the (first) edge between the specified endpoints.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @returns {Promise<*[]>}
	 */
	async getEdgeBetween(sourceId, targetId) {
		throw new Error(errors.notImplemented("getEdgeBetween"));
	}

	/**
	 * Returns the edge between the given endpoints and the specified label.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param label {string} The label.
	 * @returns {Promise<*>}
	 */
	async getEdgeWithLabel(sourceId, targetId, label) {
		throw new Error(errors.notImplemented("getEdgeWithLabel"));
	}

	/**
	 * Returns the edges with the specific label.
	 * @param label {string} A label.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getEdgesWithLabel(label, amount = 1000) {
		throw new Error(errors.notImplemented("getEdgesWithLabel"));
	}

	/**
	 * Returns the edges satisfying the given predicate.
	 * @param predicate {function|*} A predicate.
	 * @param amount? {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getEdges(predicate, amount = 1000) {
		throw new Error(errors.notImplemented("getEdges"));
	}

	/**
	 * Flexible deletion of nodes via the given predicate.
	 * @param predicate {function|*} A predicate function.
	 * @returns {Promise<string[]>} Returns the deleted items.
	 */
	async deleteNodes(predicate) {
		throw new Error(errors.notImplemented("deleteNodes"));
	}

	//endregion
}
