import { Graph, RandomGraph, Forest } from "@orbifold/graphs";

import { Utils, Strings, Errors, Datasets } from "@orbifold/utils";
import type { IQwieryNode, IQwieryEdge, GraphLike } from "@orbifold/utils";
// import CytoUtils from "./cytoUtils";
import pkg from "../package.json" assert { type: "json" };
// import GraphAPI from "./GraphAPI";

export { Graph, RandomGraph, Forest, Strings, Utils, Errors, Datasets };
export type { IQwieryNode, IQwieryEdge, GraphLike };

import { GraphStyle } from "~/utils/enums";

export function QwieryInfo() {
	return {
		version: pkg.version,
		description: pkg.description,
		name: "Qwiery",
		title: `Qwiery v${pkg.version}`,
	};
}
