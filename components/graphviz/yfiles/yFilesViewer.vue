<template>
	<client-only>
		<div v-show="licensePresent" id="graphHost"></div>
		<div v-show="!licensePresent">
			<div class="flex flex-col items-center justify-center h-full">
				<div class="text-2xl font-bold">yFiles license is missing.</div>
				<div class="text-xl">Please add it to the .env file.</div>
			</div>
		</div>
	</client-only>
</template>
<script setup lang="ts">
	import { Graph, type IQwieryEdge, type IQwieryNode } from "~/utils";

	import _ from "lodash";
	import { Class, GraphComponent, LayoutExecutor, License, Rect, ShinyPlateNodeStyle } from "yfiles";

	Class.ensure(LayoutExecutor);

	let selectionDebounceTimeout: any = null;
	const licensePresent = ref(false);
	let currentPosition: any = { x: 0, y: 0 };
	let edgeCreator: any = null;
	let nodeCreationEnabled = false;
	let edgeCreationEnabled = false;

	const emit = defineEmits<{
		(e: "selectionChanged", selection: any[]): void;
		(e: "doubleClick", id: string): void;
		(e: "createNode", node: any): void;
	}>();

	onMounted(() => {
		if (checkLicense()) {
			licensePresent.value = true;
			setTimeout(() => {
				const graphComponent = new GraphComponent("#graphHost");
				const graph = graphComponent.graph;
				graph.createNode(new Rect(0, 0, 30, 30), new ShinyPlateNodeStyle({ fill: "red" }));
			}, 500);
		} else {
			licensePresent.value = false;
		}
		// addEventHandlers();
		// for debugging
		// window["g"] = graphComponent;
	});

	function checkLicense() {
		const config = useRuntimeConfig();
		if (!config.public.YFILES_LICENSE || config.public.YFILES_LICENSE === "") {
			return false;
		}

		License.value = <any>config.public.YFILES_LICENSE;
		return true;
	}

	/**
	 * Add a node to the graph.
	 * @param node {IQwieryNode} The node to add.
	 */
	function addNode(node: IQwieryNode) {}

	function addEdge(edge: IQwieryEdge) {}

	function loadGraph(g: Graph | any, replace: boolean = true) {
		// if (_.isPlainObject(g)) {
		//     if (g.typeName === "Graph") {
		//         g = Graph.fromJSON(g);
		//     } else {
		//         throw new Error("Right now only supporting a Graph.");
		//     }
		// }
		// if (replace) {
		//     clear();
		// }
		// ogma.setGraph(OgmaUtils.toOgmaGraph(g));
		// layout();
	}

	function clear() {}

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

	async function organicLayout(options: any = {}) {}

	function fit() {}

	/**
	 * Expose the IGraphView interface.
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
