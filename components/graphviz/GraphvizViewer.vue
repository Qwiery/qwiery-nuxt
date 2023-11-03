<template>
	<div id="cy"></div>
</template>
<script setup lang="ts">
	import cytoscape, { Stylesheet } from "cytoscape";
	import _ from "lodash";
	// import CytoUtils from "~/utils/graphs/lib/visualization/cytoUtils";
	import cola from "cytoscape-cola";
	import defaultStyle from "./styles/defaultStyle.json";
	import schemaStyle from "./styles/schemaStyle.json";
	import { GraphStyle } from "~/utils/enums";

	cytoscape.use(cola);

	let cy: cytoscape.Core;
	onMounted(() => {
		cy = cytoscape({
			container: document.getElementById("cy"),
			style: <Stylesheet[]>(<unknown>defaultStyle),
		});
		// for debugging
		window["cy"] = cy;
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
		layout();
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
	 * Apply the layout with the name and options.
	 * @see Part of the {@link IGraphViewer} interface.
	 * @param layoutName {string} The name of the layout.
	 * @param [options] {any} Options specific to the layout.
	 */
	function layout(layoutName: string = "organic", options: any = {}) {
		switch (layoutName.toLowerCase()) {
			case "organic":
				organicLayout(options);
				break;
			case "hierarchical":
				hierarchicalLayout(options);
				break;
			case "concentric":
				concentricLayout(options);
				break;
			default:
				return Toasts.error(`The layout type '${layoutName}' is not handled or not supported.`);
		}
		fit();
	}

	/**
	 * Centers the graph in the canvas.
	 * @see Part of the {@link IGraphViewer} interface.
	 * @param [shouldFit] {boolean} Whether to resize so it fits in the cureent view.
	 */
	function center(shouldFit: boolean = true) {
		if (shouldFit) {
			fit();
		} else {
			cy.centre();
		}
	}

	function fit(padding: number = 20) {
		cy.fit(cy.elements(), padding);
	}

	/**
	 * Classic organic layout based on the Cola package.
	 * @see https://github.com/cytoscape/cytoscape.js-cola
	 * @param options
	 */
	function organicLayout(options = {}) {
		const layout = cy.layout(<any>{
			name: "cola",
			nodeSpacing: 58,
			padding: 80,
			randomize: true,
			maxSimulationTime: 6000,
		});
		layout.run();
	}

	function hierarchicalLayout(options = {}) {
		const layout = cy.layout(<any>{
			name: "breadthfirst",
		});
		layout.run();
	}

	function concentricLayout(options = {}) {
		const layout = cy.layout(<any>{
			name: "concentric",
		});
		layout.run();
	}

	/**
	 * Expose the IGraphViewer interface.
	 */
	defineExpose({
		addNode,
		loadGraph,
		clear,
		setStyle,
		layout,
		center,
		fit,
	});
</script>
<style scoped>
	#cy {
		@apply z-0 h-[85vh] w-full bg-white outline-none dark:bg-[#282828];
	}
</style>
