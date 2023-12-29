<template>
	<CytoscapeViewer class="cytoscape" ref="viewer" />
</template>
<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { Graph } from "@orbifold/graphs";
	const viewer = ref(null);
	const { $cyto } = useNuxtApp();
	onMounted(() => {
		const cy = <any>viewer.value;
		const g = Graph.create("erdos");
		cy.loadGraph(g);
		cy.layout();
		console.log($cyto.isCytoEdge({}));
	});
</script>
<style>
	.cytoscape {
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
