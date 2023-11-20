import Graph from "~/utils/graphs/lib/graph";
import RandomGraph from "~/utils/graphs/lib/graphData/randomGraph";
import INodeBase from "~/utils/graphs/lib/iNodeBase";
import Forest from "~/utils/graphs/lib/forest";

import { Strings } from "./utils/lib/strings";
import { Utils } from "./utils/lib/utils";
import CytoUtils from "./cytoUtils";
import pkg from "../package.json" assert { type: "json" };
import Errors from "./utils/lib/errors";
// import GraphAPI from "./GraphAPI";
import DataGenerator from "./utils/lib/dataGenerator";
import { Datasets } from "./utils/lib/datasets";

export { Graph, RandomGraph, INodeBase, Forest, Strings, Utils, CytoUtils, Errors, DataGenerator, Datasets };

import { GraphStyle } from "~/utils/enums";

/*
 * Common denominator across the various clients and backends.
 * @see IEntityNode
 * */
export interface IQwieryNode {
	id: string;
}

/*
 * Common denominator across the various clients and backends.
 * @see IEntityEdge
 * */
export interface IQwieryEdge {
	id: string;
	sourceId: string;
	targetId: string;
}

/**
 * Defines a knowledge graph entity.
 */
export interface IEntityNode {
	id?: string;
	data?: any;
	labels?: string[];
}

/*
 * Defines a knowledge graph edge.
 * */
export interface IEntityEdge {
	id?: string;
	data?: any;
	labels?: string[];
	sourceId: string;
	targetId: string;
}

/**
 * The interface of a graph viewer.
 * Out of the box you get an implementation based on Cytoscape (https://js.cytoscape.org).
 * See the `GraphvizViewer.vue` file under `components/graphviz` for the actual implementation.
 * ---
 * We have commercial alternatives based on
 * - yFiles by yWorks (https://www.yworks.com)
 * - Ogma by Linkurious (https://linkurious.com/ogma/)
 * - GoJs by Northwoods Software (https://gojs.net/latest/index.html)
 *
 * For more info, {@link info@orbifold.net|contact us} .
 *
 * ---
 *
 * General principle:
 * - the actual implementation uses underneath different types of node or edge structure
 * - nodes/edges go in and out as plain objects, DO NOT return vendor specific objects
 * - a nodes/edges have an id
 * - in addition, an edge has sourceId/targetId
 * - all the rest is optional (labels, name, position...)
 */
export interface IGraphViewer {
	/**
	 * Adds a new node to the graph.
	 * @param n {IEntityNode} The raw data defining the node.
	 */
	addNode: (n: IEntityNode) => string;

	/**
	 * Load the given graph in the viewer.
	 * @param g {Graph} A graph.
	 * @param replace {boolean} Whether it should replace the current view or increment it.
	 */
	loadGraph: (g: Graph | any, replace?: boolean) => void;

	/**
	 * Clear the view (remove all nodes and edges).
	 */
	clear: () => void;

	/**
	 * Apply the given style.
	 * @param styleName {string} The style name.
	 */
	setStyle: (styleName: GraphStyle) => void;

	/**
	 * Apply the layout with the name and options.
	 * @param layoutName {string} The name of the layout.
	 * @param [options] {any} Options specific to the layout.
	 */
	layout: (layoutName?: string, options?: any) => void;

	/**
	 * Pan the graph to the centre of a collection.
	 * @param [fit] {boolean} Resize to fit the canvas.
	 */
	center: (fit?: boolean) => void;

	/**
	 * Fit the graph in the canvas.
	 * @param [padding] {number} The margin around the graph (in pixels).
	 */
	fit: (padding?: number) => void;

	/**
	 * Zoom into the diagram.
	 * @param [amount] {number} A value >1 magnifies while <1 zooms out. If nothing is given the current value is returned.
	 */
	zoom: (amount?: number) => number;

	/**
	 * Removes the node with the given id.
	 * @param id {string|any} A node or the id of a node.
	 */
	removeNode: (id: string | any) => void;

	/**
	 * Returns the nodes of the graph or the ones satisfying the given predicate.
	 * @param [filter] {Function} Optional node predicate.
	 */
	getNodes: (filter?: Function) => any[];

	/**
	 * Removes the nodes with degree zero.
	 */
	removeIsolatedNodes: () => void;

	/**
	 * Enables or disables the interactive edge creation.
	 * @param [enabled] {boolean} Whether it should be enabled.
	 */
	edgeCreation: (enabled: boolean) => void;

	/**
	 * Enables or disables the interactive node creation.
	 * @param [enabled] {boolean} Whether it should be enabled.
	 */
	nodeCreation: (enabled: boolean) => void;

	/**
	 * Centers the given node.
	 * @param node {any} A node.
	 */
	centerNode: (node: any) => void;

	/**
	 * Returns the selected nodes.
	 */
	selectedNodes: () => any[];

	/**
	 * Returns the position of the pointer on canvas.
	 */
	getPosition: () => {
		x: number;
		y: number;
	};

	/**
	 * Removes whatever is selected.
	 */
	removeSelection: () => void;

	/**
	 * returns the node with the specified id.
	 * @param id {string} An identifier.
	 */
	getNode: (id: string) => any;

	/*
	 * Sets the data (payload) on a node.
	 * */
	setNodeProperty: (id, name, value) => void;

	/*
	 * Refreshes the style on the graph.
	 * */
	refreshStyle: () => void;

	/*
	 * Lets the diagram know that dimensions have changed and it should refresh accordingly.
	 * */
	forceResize: () => void;

	/*
	 * Adds the given (sub)graph to the current one.
	 * */
	augment: (g: Graph) => void;
}

export function QwieryInfo() {
	return {
		version: pkg.version,
		description: pkg.description,
		name: "Qwiery",
		title: `Qwiery v${pkg.version}`,
	};
}
