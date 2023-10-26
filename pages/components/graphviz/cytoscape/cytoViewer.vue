<template>
	<div id="cy"></div>
</template>
<script setup lang="ts">
	import cytoscape, { Stylesheet } from "cytoscape";
	import _ from "lodash";
	// import CytoUtils from "~/utils/graphs/lib/visualization/cytoUtils";
	import cola from "cytoscape-cola";
	import defaultStyle from "./defaultStyle.json";
	import schemaStyle from "./schemaStyle.json";
	import { GraphStyle } from "~/utils/enums";

	cytoscape.use(cola);

	let cy: cytoscape.Core;
	onMounted(() => {
		cy = cytoscape({
			container: document.getElementById("cy"),
			style: <Stylesheet[]>(<unknown>defaultStyle),
		});
	});

	function addNode(rawNode: IRawNode) {
		cy.add([
			{
				group: "nodes",
				data: rawNode.data,
				position: { x: rawNode.data?.x || 0, y: rawNode.data?.y || 0 },
			},
		]);
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
		cy.json({ elements: CytoUtils.toElements(g) });
		const layout = cy.layout(<any>{
			name: "cola",
			nodeSpacing: 58,
			padding: 80,
			randomize: true,
			maxSimulationTime: 6000,
		});
		layout.run();
		cy.centre();
	}

	function clear() {
		cy.elements().remove();
	}

	function setStyle(styleName: GraphStyle) {
		if (styleName) {
			switch (styleName) {
				case GraphStyle.Default:
					cy.style(<Stylesheet[]>defaultStyle);
					break;
				case GraphStyle.Schema:
					cy.style(<Stylesheet[]>schemaStyle);

					break;
			}
		}
	}

	/**
	 * Expose the IGraphViewer interface.
	 */
	defineExpose({
		addNode,
		loadGraph,
		clear,
		setStyle,
	});
</script>
<style scoped>
	#cy {
		@apply z-0 h-[85vh] w-full bg-white outline-none dark:bg-[#282828];
	}
</style>
