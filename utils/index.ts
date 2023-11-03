import Graph from "~/utils/graphs/lib/graph";
import RandomGraph from "~/utils/graphs/lib/graphData/randomGraph";
import INodeBase from "~/utils/graphs/lib/iNodeBase";
import Forest from "~/utils/graphs/lib/forest";

import { Strings } from "./utils/lib/strings";
import { Utils } from "./utils/lib/utils";
import CytoUtils from "./graphs/lib/visualization/cytoUtils";
import pkg from "../package.json" assert { type: "json" };
import Errors from "./utils/lib/errors";
// import GraphAPI from "./GraphAPI";

export { Graph, RandomGraph, INodeBase, Forest, Strings, Utils, CytoUtils, Errors };

import { GraphStyle } from "~/utils/enums";

/**
 * Defines the data stored in Qwiery.
 */
export interface IRawNode {
	id: string;
	data: any;
	labels: string[];
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
 */
export interface IGraphViewer {
	/**
	 * Adds a new node to the graph.
	 * @param n {IRawNode} The raw data defining the node.
	 */
	addNode: (n: IRawNode) => string;

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
	layout: (layoutName: string, options?: any) => void;

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
}

export function GraphalyzerInfo() {
	return {
		version: pkg.version,
		description: pkg.description,
		name: "Graphalyzer",
		title: `Graphalyzer v${pkg.version}`,
	};
}
