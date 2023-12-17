<template>
	<div id="graphHost"></div>
</template>
<script setup lang="ts">
	import { CytoUtils, type IQwieryEdge, type IQwieryNode } from "~/utils";
	import Ogma from "@linkurious/ogma";
	import OgmaUtils from "~/utils/ogmaUtils";
	import _ from "lodash";

	let selectionDebounceTimeout: any = null;

	let currentPosition: any = { x: 0, y: 0 };
	let ogma: Ogma;
	let edgeCreator: any = null;
	let nodeCreationEnabled = false;
	let edgeCreationEnabled = false;
	const emit = defineEmits<{
		(e: "selectionChanged", selection: any[]): void;
		(e: "doubleClick", id: string): void;
		(e: "createNode", node: any): void;
	}>();

	onMounted(() => {
		ogma = new Ogma({
			container: "graphHost",
			options: {},
		});
		ogma.styles.addNodeRule({
			shape: "circle",
			color: "steelblue",
			radius: 10,
			text: {
				content: (node: any) => {
					return node.getData("name");
				},
				position: "center",
				color: "#fff",
			},
		});
		ogma.styles.addEdgeRule({
			color: "#ccc",
			width: 1,
			text: {
				content: (edge: any) => {
					return edge.getData("name");
				},
				color: "#000",
			},
		});
		setTimeout(() => {
			ogma.view.forceResize();
		}, 500);
		// addEventHandlers();
		// for debugging
		window["ogma"] = ogma;
	});

	/**
	 * Add a node to the graph.
	 * @param node {IQwieryNode} The node to add.
	 */
	function addNode(node: IQwieryNode) {
		const oNode = OgmaUtils.toRawNode(node);
		if (oNode) {
			ogma.addNode(oNode);
		}
	}

	function addEdge(edge: IQwieryEdge) {
		const oEdge = OgmaUtils.toRawEdge(edge);
		if (oEdge) {
			ogma.addEdge(oEdge);
		}
	}

	function loadGraph(g: Graph | any, replace: boolean = true) {
		if (_.isPlainObject(g)) {
			if (g.typeName === "Graph") {
				g = Graph.fromJSON(g);
			} else {
				throw new Error("Right now only supporting a Graph.");
			}
		}
		if (replace) {
			clear();
		}
		ogma.setGraph(OgmaUtils.toOgmaGraph(g));
		layout();
	}

	function clear() {
		ogma.clearGraph();
	}

	async function layout(layoutName: string = "organic", options: any = {}) {
		switch (layoutName.toLowerCase()) {
			case "organic":
				await organicLayout(options);
				break;
			case "hierarchical":
				break;
			case "concentric":
				break;
			default:
				return Toasts.error(`The layout type '${layoutName}' is not handled or not supported.`);
		}
		fit();
	}

	async function organicLayout(options: any = {}) {
		await ogma.layouts.force({
			...options,
			name: "organic",
			gravity: 0.05,
			springLength: 100,
			springCoeff: 0.0008,
			dragCoeff: 0.02,
			timeStep: 20,
			iterations: 1000,
			fit: true,
		});
	}

	function fit() {
		ogma.view.locateGraph();
	}

	/**
	 * Expose the IGraphViewer interface.
	 */
	defineExpose({
		addNode,
		loadGraph,
		clear: () => {},
		setStyle: () => {},
		layout: () => {},
		center: () => {},
		fit,
		zoom: () => {},
		removeNode: () => {},
		getNodes: () => {},
		removeIsolatedNodes: () => {},
		edgeCreation: () => {},
		nodeCreation: () => {},
		selectedNodes: () => {},
		centerNode: () => {},
		getPosition: () => {},
		removeSelection: () => {},
		getNode: () => {},
		refreshStyle: () => {},
		forceResize: () => {},
		augment: () => {},
		setNodeProperty: () => {},
		setNodeProperties: () => {},
	});
</script>
<style scoped>
	#graphHost {
		@apply z-0 h-[85vh] w-full bg-white outline-none dark:bg-[#282828];
	}
</style>
