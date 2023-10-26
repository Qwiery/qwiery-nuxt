import Graph from "~/utils/graphs/lib/graph";
import RandomGraph from "~/utils/graphs/lib/graphData/randomGraph";
import INodeBase from "~/utils/graphs/lib/iNodeBase";
import Forest from "~/utils/graphs/lib/forest";

import { Strings } from "./utils/lib/strings";
import { Utils } from "./utils/lib/utils";
import CytoUtils from "./graphs/lib/visualization/cytoUtils";

export { Graph, RandomGraph, INodeBase, Forest, Strings, Utils, CytoUtils };

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
 */
export interface IGraphViewer {
	/**
	 * Adds a new node to the graph.
	 * @param n {IRawNode} The raw data defining the node.
	 */
	addNode: (n: IRawNode) => string;
	loadGraph: (g: Graph | any, replace?: boolean) => void;
	clear: () => void;
	setStyle: (styleName: GraphStyle) => void;
}
