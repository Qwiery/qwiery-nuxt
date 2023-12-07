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
	 * @param [options={}] {adapters:string[]} Diverse options.
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
	 *
	 * @returns {string}
	 */
	static get version() {
		return pkg.version;
	}

	/**
	 * Package info in one line.
	 *
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
				if (typeof fun.call != "function") {
					throw new Error(`Very likely that your implementation of '${methodName}' is not correct and does not return an async function. It should be itself not an async function. `);
				}
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
	 *
	 * Danger: it will remove all nodes and edges without confirmation request or warning.
	 * @async
	 * @emits  "clear" without any data.
	 * @return {Promise<void>} Does not return anything.
	 *
	 * @example
	 *
	 * const q = new Qwiery();
	 * await q.clear();
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

	/**
	 * Loads a graph and completely replaces the current data.
	 *
	 * @param name {string} The name of the dataset.
	 * @returns {Promise<void>}
	 */
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
	 * @param [amount=10] {number} The maximum amount of nodes to return.
	 * @returns {Promise<Graph>}
	 *
	 * @example
	 *
	 * const q = new Qwiery();
	 * await q.randomGraph();
	 * // this returns the parents and children of node with id "5" together with the edges
	 * const g = await g.getNeighborhood("5")
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
	 * @description
	 * This method implements various graph generation algorithms like Erdos-Renyi, Watts-Strogatz and more.
	 * The parameters depend on the selected algorithm.
	 *
	 * @param name {string} The name of the algorithm to use.
	 * @param args {*[]} Parameters specific to the algorithm.
	 * @returns {Promise<Graph>} The generated graph.
	 *
	 * @example
	 *
	 * const q = new Qwiery();
	 * // use the Erdos-Renyi algorithm to generate 40 nodes and 50 edges
	 * await q.randomGraph("erdos", 40, 50)
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
	 * @description
	 * - the name of the node and edges is the label (class).
	 * - the schema is a graph
	 * - the schema is inferred from the data, there is strictly speaking no schema in the database constraining the data
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
	 *
	 * @description
	 * - a path query is an array defining a path template
	 * - the result is a graph in which every node is part of the full path
	 * - path queries allow you to fetch data without having to write queries
	 * - the asterisk defines a wildcard
	 * @param path {string[]}
	 * @param [amount=1000] {number} The maximum amount of nodes to return.
	 * @return  {Promise<Graph>}
	 *
	 * @example
	 *
	 * await q.pathQuery(["*", "Knows", "*"])
	 * await q.pathQuery(["Person", "*", "Location"])
	 * await q.pathQuery(["Person", "*", "Location", "*", "Hotel"])
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
	 * Search of the nodes for the given term (in the specified fields).
	 *
	 * @param term {string} A search term.
	 * @param [fields=[]] {string[]} The properties to consider in the search.
	 * @param [amount=100] {number} The maximum amount of nodes to return.
	 * @return {Promise<any>}
	 * @example
	 *
	 * await q.searchNodes("ato", ["name", "description"])
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
	 *
	 * @param term {string} A search term.
	 * @param fields {string[]} The properties to consider in the search.
	 * @param label {string|null} Only nodes having the specified label.
	 * @param [amount=100] {number} Return at most the given amount.
	 * @example
	 *
	 * await q.searchNodesWithLabel("fos", ["firstName"], "Person", 20)
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
	 *
	 * @param predicate {function|*} A Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @param amount {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 * @see [Mongo Projections](https://www.mongodb.com/docs/manual/reference/operator/query/)
	 * @example
	 *
	 * const found = await q.getNodes({age:{$gt: 20}})
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
	 *
	 * @param label {string} A label.
	 * @param [amount=1000] {number} The maximum amount to return.
	 * @returns {Promise<*[]>}
	 *
	 * @example
	 *
	 * const found = await q.getNodesWithLabel("Company", 30);
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
	 * Returns the node with the given specs.
	 *
	 *
	 * @description
	 * The specification can be
	 * - a string representing the id of the node
	 * - a predicate (function) if the underlying adapter supports it. This works for the JSON store, for instance, but not for the Cypher adapter.
	 * - a Mongo projection (the adapter will convert this to a native query constraint).
	 *
	 * @param id {string|function|*} The node id or a Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @returns {Promise<*|null>}
	 *
	 * @example
	 *
	 * await q.getNode("bc0d7ac6-9a9a-44de-98d9-af371337482a")
	 *
	 * // only if the adapter handles it	 *
	 * await q.getNode((n)=>{return n.id = "a" && !n.archived})
	 *
	 * // always works
	 * await q.getNode({id: {$eq: 132}})
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
	 *
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
	 *
	 * @param [predicate=null] {function} An optional predicate.
	 * @returns {Promise<number>}
	 *
	 * @example
	 *
	 * await q.nodeCount({x:{$lt:10}})
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
	 *
	 * @param [id=null] {string|null} The unique id of the node.
	 * @param [data] {*} The payload.
	 * @param [labels] {string[]} One or more labels.
	 * @returns {*}
	 *
	 * @example
	 *
	 * let n = await q.createNode(); // something like {"id":"f3b0db00-fee8-44f6-a3d3-50a3e0d3fe26"}
	 * n = await q.createNode("a"); // {id:"a"}
	 * n = await q.createNode(1042); // {id:"1042"}
	 * n = await q.createNode({name: "Carl"}); // {id:"a5a278ef-7c59-4680-8e6b-cfe58ba6701a", name: "Carl"}
	 * n = await q.createNode({name:"Yan"}, "a", "Person"); // {id:"a", name: "Carl", labels:["Person"]}
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
	 *
	 * @see {@link createNode}
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
	 *
	 * Note: it's the adapter's responsibility to manage the integrity of the graph. This is automatic if you use
	 * Neo4j but not if you implement your own adapter. All the Qwiery adapters (JSON, SQL...) do ensure integrity.
	 *
	 * @param id {string} The id of the node to delete.
	 * @returns {Promise<void>}
	 * @see {@link deleteNodes}
	 *
	 * @example
	 *
	 * await q.deleteNode("5005b86d-e350-43b1-aa6e-fb910fa19174"); // void
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
	 *
	 * @see {@link deleteNode}
	 * @param predicate {function} A predicate function.
	 * @returns {Promise<string[]>} Returns the deleted items.
	 *
	 * @example
	 *
	 * await q.deleteNodes({age:{$gt: 50}});
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
	 *
	 * Note:
	 * - this raises an error if the node does not exist. The {@link upsertNode} does not raise an error and will create the node instead
	 * - the given data has to specify an id or the second param (id) has to be given in order to update something
	 * - you cannot change the id via an update.
	 *
	 * @param [data=null] {*} The payload.
	 * @param [id=null] {string|null} The id of the node to update or create.
	 * @param [labels=null] {string[]} The labels of the node.
	 * @returns {*}
	 *
	 * @example
	 *
	 * await q.updateNode({id: "a", name:"Kris"})
	 * await q.updateNode({name:"Kris"}, "a")
	 * await q.updateNode({name:"Kris"}, "a", ["A", "B"])
	 * await q.updateNode({id:"a", name:"Kris", labels:["A", "B"]})
	 *
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
	 *
	 * Note: same as {@link updateNode} but does not raise an error if the node does not exist.
	 *
	 * @param [data=null] {*} The payload.
	 * @param [id=null] {string|null} The id of the node to update or create.
	 * @param [labels=null] {string[]} The labels of the node.
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
	 *
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
	 *
	 * Note: this is inferred from all the nodes with the specified label. The property is returned if at least one node with the given label has this property assigned.
	 *
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
	 * Checks whether an edge with the specified Id exists in the store.
	 *
	 * @param {string} id - The Id of the edge to check.
	 * @returns {Promise<boolean>} A Promise that resolves to a boolean value indicating whether the edge exists.
	 * @throws {Error} If an error occurred while checking the existence of the edge.
	 *
	 * @example
	 *
	 * await q.edgeExists("e1")
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
	 *
	 * @param {function|null} [predicate=null] - An optional predicate.
	 * @returns {Promise<number>} - A promise that resolves to the number of edges.
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
	 *
	 * @param sourceId {string} The id of the source node.
	 * @param [targetId=null] {string|null} The id of the target node.
	 * @param [data=null] {*} The payload.
	 * @param [id=null] {string} The unique id of the edge.
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
	 *
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
	 *
	 * @param data {*} The payload.
	 * @param [id=null] {string|null} The edge id.
	 * @param [labels=null] The labels on the edge.
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
	 *
	 * @param data {*} The payload.
	 * @param [id=null] {string|null} The edge id.
	 * @param [labels=null] The labels on the edge.
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
	 *
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
	 *
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
	 *
	 * @param sourceId {string} The source id.
	 * @param targetId {string} The target id.
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
	 *
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
	 *
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
	 *
	 * @param predicate {function|*} A Mongo-like projection. If the adapter supports it, a function can be passed.
	 * @param [amount=1000] {number} The maximum amount to return.
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
	 * This method should typically not be overridden by adapter implementations.
	 *
	 * @param sourceId {string} The source id.
	 * @param [amount=1000] {number} The maximum amount to return.
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
	 *
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
