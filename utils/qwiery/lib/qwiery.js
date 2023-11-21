import errors from "../../utils/lib/errors.js";
import _ from "lodash";
import EventEmitter from "eventemitter3";
import pkg from "../../../package.json" assert { type: "json" };
import Memory from "./defaultStore/defaultAdapter.js";
import { Utils } from "../../utils/lib/utils.js";
import process from "process";

/*
 * Gateway to graphs.
 * */
import RandomGraph from "../../graphs/lib/graphData/randomGraph.js";

export default class Qwiery extends EventEmitter {
	/**
	 * The options passed at instantiation.
	 * @type {*}
	 */
	options = {
		adapters: ["memory"],
		id: Utils.id(),
	};

	storageApis = [];
	storageInitErrors = [];
	static adapters = [Memory];
	/**
	 * Dictionary of adapterId-adapterClass.
	 * @type {{ [key: string]: any; }}
	 */
	static adapterDic = {
		memory: Memory,
	};

	/**
	 * The array of (storage) adapters.
	 * @type {[]}
	 */
	adapterSequence = [];

	get adapterIds() {
		return _.keys(Qwiery.adapterDic);
	}

	/**
	 * Instantiates Qwiery.
	 * @param options? {adapters:string[]} Diverse options.
	 */
	constructor(options = {}) {
		super();
		_.assign(this.options, options);

		if (options.adapters) {
			this.adapterSequence = _.cloneDeep(options.adapters);
			if (options.adapters.length === 0) {
				console.warn("The adapter sequence is empty, no data will be ingested or returned.");
			}
		} else {
			this.adapterSequence = ["memory"];
		}

		this.setupAdapters();
	}

	get id() {
		return this.options.id;
	}

	/**
	 * Assembles the actual sequence of adapters based on the given options (or defaults).
	 */
	async setupAdapters() {
		const whichAdapters = [];
		for (const adapterId of this.adapterSequence) {
			if (Qwiery.adapterDic[adapterId]) {
				whichAdapters.push(Qwiery.adapterDic[adapterId]);
			} else {
				console.warn(`Adapter with id '${adapterId}' was specified but does not exist.`);
			}
		}
		for (const ad of whichAdapters) {
			ad.call(this, this.options, (err, api) => {
				if (err) {
					// can't simply throw here, will throw on first storage call.
					this.storageInitErrors.push(err);
				} else {
					// first given, first handled
					this.storageApis.push(api);
				}
			});
		}
	}

	/**
	 * Returns the package version.
	 * @returns {string}
	 */
	static get version() {
		return pkg.version;
	}

	/**
	 * Package info in one line.
	 * @returns {string}
	 */
	static get info() {
		return `Qwiery v${pkg.version} by ${pkg.author}. ${pkg.description}`;
	}

	//region Plugin mechanics

	/**
	 * Registers a new adapter.
	 * @example
	 * const myAdapter = function(options, done){
	 *     // adapter implementation
	 * }
	 * Qwiery.adapter("my-adapter", myAdapter);
	 * const q = new Qwiery({adapters:["my-adapter", "memory]});
	 * @param id {string} The unique identifier for the adapter which should be used in the configuration.
	 * @param ad {Function} The adapter function.
	 */
	static adapter(id, ad) {
		if (Utils.isEmpty(id)) {
			throw new Error("The given adapter id is nil.");
		}
		if (!_.isString(id)) {
			throw new Error("The given adapter id should be a string.");
		}
		if (Utils.isEmpty(ad)) {
			throw new Error("The given adapter is nil.");
		}
		if (!_.isFunction(ad)) {
			throw new Error("An adapter should be a function with parameters (options, done).");
		}
		Qwiery.adapterDic[id] = ad;
		Qwiery.adapters.push(ad);
	}

	/**
	 * Adds a plugin.
	 * @param obj {*|function} A plugin (function or object).
	 */
	static plugin(obj) {
		if (_.isNil(obj)) {
			throw new Error(errors.isNil("obj", "Qwiery.plugin"));
		}
		if (_.isFunction(obj)) {
			obj(Qwiery);
		} else if (_.isPlainObject(obj)) {
			if (Utils.isEmpty(obj)) {
				throw new Error("Given plugin is empty.");
			}
			_.forEach(obj, (v, k) => {
				Qwiery.prototype[k] = v;
			});
		} else {
			throw new Error(errors.invalidPlugin());
		}
	}

	/**
	 * Iterates a call over the adapters and catches potential issues along the road.
	 * @param methodName {string} The store method to trigger.
	 * @param argArray {*[]} An array of argument specific for the called method.
	 * @returns {Promise<*>}
	 */
	async callAdapters(methodName, argArray) {
		if (this.storageInitErrors.length > 0) {
			const errs = this.storageInitErrors.join("\n\n");
			this.storageInitErrors = [];
			throw new Error(errs);
		}
		let fun,
			args = argArray,
			returnValue = null,
			hasError = false,
			ret = null,
			errs;
		let anyone = false;
		for (let i = 0; i < this.storageApis.length; i++) {
			hasError = false;
			errs = null;

			if (this.storageApis[i][methodName]) {
				anyone = true;
				fun = this.storageApis[i][methodName]((err, newArguments, newReturnValue) => {
					if (err !== null) {
						errs = err;
						hasError = true;
					} else {
						args = newArguments;
						returnValue = newReturnValue;
					}
				});
				// the last parameter will always be the return value of the previous call
				await fun.call(this.storageApis[i], args, returnValue);
			}

			if (hasError) {
				// break;
				throw new Error(errs);
			}
		}
		// has any adapter been called?
		if (!anyone) {
			throw new Error(`The method '${methodName}' is not implemented by any adapter.`);
		}
		// duality of arguments and return values here
		return returnValue;
	}

	/**
	 * Calls the sequence of adapters.
	 * This is effectively the gateway to storing stuff.
	 * @param methodName {string} The store method to trigger.
	 * @param args {*[]} An array of argument specific for the called method.
	 * @returns {Promise<*>}
	 */
	async callStore(methodName, args) {
		return new Promise((resolve, reject) => {
			process.nextTick(async () => {
				try {
					const found = await this.callAdapters(methodName, args);
					resolve(found);
				} catch (e) {
					reject(e);
				}
			});
		});
	}

	//endregion

	//region Graph

	/**
	 * Clears the graph.
	 * @emits  "clear" without any data.
	 * @return {Promise<void>} Does not return anything.
	 */
	async clear() {
		try {
			await this.callStore("clear", []);
			this.emit("clear");
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	async loadGraph(name = "food") {
		try {
			await this.callStore("loadGraph", [name]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the parents and children of the given node id as a graph.
	 * @param id {string} A node id.
	 * @returns {Promise<Graph>}
	 */
	async getNeighborhood(id, amount = 10) {
		try {
			return await this.callStore("getNeighborhood", [id, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Generates pseudo-random graph data.
	 * @param name {string} The name of the algorithm to use.
	 * @param args {*[]} Parameters specific to the algorithm.
	 * @returns {Promise<Graph>} The generated graph.
	 */
	async randomGraph(name = "Erdos", ...args) {
		const g = RandomGraph.create(name, ...args);
		// note that you can customize the node payload via the static {@link RandomGraph.nodeCreator} method.

		// since this effectively creates data via the adapter we need to convert the ids to ensure that it does not clash with existing data
		g.reIndex();
		for (const node of g.nodes) {
			// name and typeName not relevant here
			delete node.name;
			delete node.typeName;
			await this.createNode(node);
		}
		for (const edge of g.edges) {
			await this.createEdge(edge.sourceId, edge.targetId);
		}
		return g;
	}

	/**
	 * Returns the schema from the existing data as a graph.
	 * The name of the node and edges is the label (class).
	 * @param cached {boolean} If true the cached version will be used, otherwise the schema will be recomputed and cached.
	 * @return {Promise<Graph>}
	 */
	async inferSchemaGraph(cached = true) {
		try {
			return await this.callStore("inferSchemaGraph", [cached]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the graph of data matching the given path query.
	 * @param path {string[]}
	 * @return  {Promise<Graph>}
	 */
	async pathQuery(path, amount = 1000) {
		try {
			return await this.callStore("pathQuery", [path, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	//endregion

	//region Node

	/**
	 * Search of the nodes for the given term.
	 * @param term {string} A search term.
	 * @param fields {string[]} The properties to consider in the search.
	 */
	async searchNodes(term, fields = [], amount = 100) {
		try {
			return await this.callStore("searchNodes", [term, fields, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Search of the nodes with specified labels for the given term.
	 * @param term {string} A search term.
	 * @param fields {string[]} The properties to consider in the search.
	 * @param label {string|null} Only nodes having the specified label.
	 * @param [amount=100] {number} Return at most the given amount.
	 */
	async searchNodesWithLabel(term, fields = [], label = null, amount = 100) {
		try {
			return await this.callStore("searchNodesWithLabel", [term, fields, label, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}
	/**
	 * Returns the nodes satisfying the given predicate.
	 * @param predicate {function|*} A Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getNodes(predicate = {}, amount = 1000) {
		try {
			return await this.callStore("getNodes", [predicate, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the nodes with the specified labels.
	 * @param label {string} A label.
	 * @param amount? {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getNodesWithLabel(label, amount = 1000) {
		try {
			return await this.callStore("getNodesWithLabel", [label, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the node with the specified id.
	 * @param id {string|function|*} The node id or a Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @returns {Promise<*|null>}
	 */
	async getNode(id) {
		try {
			return await this.callStore("getNode", [id]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Checks whether the node with the specified id exists.
	 * @param id {string} Id of the node.
	 * @returns {Promise<boolean>}
	 */
	async nodeExists(id) {
		try {
			return await this.callStore("nodeExists", [id]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Return the amount of nodes with the specified predicate, if any given.
	 * @param predicate? {function} An optional predicate.
	 * @returns {Promise<number>}
	 */
	async nodeCount(predicate = null) {
		try {
			return await this.callStore("nodeCount", [predicate]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Creates a new node.
	 * @param id? {string} The unique id of the node.
	 * @param data? {*} The payload.
	 * @param labels? {string[]} One or more labels.
	 * @returns {*}
	 */
	async createNode(data = null, id = null, labels = null) {
		try {
			const node = await this.callStore("createNode", [data, id, labels]);
			this.emit("createNode", node);
			return node;
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Creates a sequence of nodes.
	 * @param seq {string[]|*[]} A sequence of node id's or node specs.
	 * @returns {Promise<*[]>} The created nodes.
	 */
	async createNodes(seq) {
		try {
			return await this.callStore("createNodes", [seq]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Deletes the specified node.
	 * @param id {string} The id of the node to delete.
	 * @returns {Promise<void>}
	 */
	async deleteNode(id) {
		try {
			// note that it's the store's responsibility to honor integrity.
			// specifically, removing incidence edges when a node is removed
			await this.callStore("deleteNode", [id]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Flexible deletion of nodes via the given predicate.
	 * @param predicate {function} A predicate function.
	 * @returns {Promise<string[]>} Returns the deleted items.
	 */
	async deleteNodes(predicate) {
		try {
			await this.callStore("deleteNodes", [predicate]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Updates a node.
	 * @param data? {*} The payload.
	 * @param id? {string} The id of the node to update or create.
	 * @param labels? {string[]} The labels of the node.
	 * @returns {*}
	 */
	async updateNode(data = null, id = null, labels = null) {
		try {
			return await this.callStore("updateNode", [data, id, labels]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Upserts a node.
	 * @param data? {*} The payload.
	 * @param id? {string} The id of the node to update or create.
	 * @param labels? {string[]} The labels of the node.
	 * @returns {*}
	 */
	async upsertNode(data = null, id = null, labels = null) {
		try {
			return await this.callStore("upsertNode", [data, id, labels]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Fetches all the labels across all nodes.
	 * @return {Promise<string[]>}
	 */
	async getNodeLabels() {
		try {
			return await this.callStore("getNodeLabels", []);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Fetches all the properties of a given label.
	 * @return {Promise<string[]>}
	 */
	async getNodeLabelProperties(labelName) {
		try {
			return await this.callStore("getNodeLabelProperties", [labelName]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	//endregion

	//region Edge

	/**
	 * Checks whether the edge with the given id exists.
	 * @param id {string} The edge id.
	 * @returns {Promise<boolean>}
	 */
	async edgeExists(id) {
		try {
			return await this.callStore("edgeExists", [id]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the amount of edges, optionally filtered with the specified predicate.
	 * @param predicate? {function} An optional predicate.
	 * @returns {Promise<number>}
	 */
	async edgeCount(predicate = null) {
		try {
			return await this.callStore("edgeCount", [predicate]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
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
	async createEdge(sourceId, targetId = null, data = null, id = null, labels = null) {
		// const edge = await this.#store.createEdge(sourceId, targetId, data, id, labels);
		// this.emit("createEdge", edge);
		// return edge;
		try {
			const edge = await this.callStore("createEdge", [sourceId, targetId, data, id, labels]);
			this.emit("createEdge", edge);
			return edge;
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Deletes the edge with the specified id.
	 * @param id {string} The edge id.
	 * @returns {Promise<void>}
	 */
	async deleteEdge(id) {
		try {
			return await this.callStore("deleteEdge", [id]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Updates an edge.
	 * @param data {*} The payload.
	 * @param id? {string} The edge id.
	 * @param labels?
	 * @returns {*}
	 */
	async updateEdge(data, id = null, labels = null) {
		try {
			return await this.callStore("updateEdge", [data, id, labels]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Upserts an edge.
	 * @param data {*} The payload.
	 * @param id? {string} The edge id.
	 * @param labels?
	 * @returns {*}
	 */
	async upsertEdge(data, id = null, labels = null) {
		try {
			return await this.callStore("upsertEdge", [data, id, labels]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the edge with the specified id.
	 * @param id {string|function|*} The node id or a Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @returns {*}
	 */
	async getEdge(id) {
		try {
			return await this.callStore("getEdge", [id]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the edges between the specified endpoints.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getEdgesBetween(sourceId, targetId, amount = 10) {
		try {
			return await this.callStore("getEdgesBetween", [sourceId, targetId, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the (first) edge between the specified endpoints.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getEdgeBetween(sourceId, targetId) {
		try {
			return await this.callStore("getEdgeBetween", [sourceId, targetId]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the edge between the given endpoints and the specified label.
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
	 * @param label {string} The label.
	 * @returns {Promise<*>}
	 */
	async getEdgeWithLabel(sourceId, targetId, label) {
		try {
			return await this.callStore("getEdgeWithLabel", [sourceId, targetId, label]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the edges with the specific label.
	 * @param label {string} A label.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getEdgesWithLabel(label, amount = 1000) {
		try {
			return await this.callStore("getEdgesWithLabel", [label, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * Returns the edges satisfying the given predicate.
	 * @param predicate {function|*} A Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @param amount? {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 */
	async getEdges(predicate, amount = 1000) {
		try {
			return await this.callStore("getEdges", [predicate, amount]);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	/**
	 * This is a utility method to fetch the edges to the children of the specified node.
	 * This method should typically not be overriden by adapter implementations.
	 * @param sourceId
	 * @param amount
	 * @returns {Promise<*>}
	 */
	async getDownstreamEdges(sourceId, amount = 1000) {
		return await this.getEdges({ sourceId }, amount);
	}

	async getUpstreamEdges(targetId, amount = 1000) {
		return await this.getEdges({ targetId }, amount);
	}

	/**
	 * Fetches all the labels across all edges.
	 * @return {Promise<*>}
	 */
	async getEdgeLabels() {
		try {
			return await this.callStore("getEdgeLabels", []);
		} catch (e) {
			/* istanbul ignore next */
			throw e;
		}
	}

	//endregion
}
