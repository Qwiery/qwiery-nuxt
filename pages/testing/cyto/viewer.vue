<script setup lang="ts">
	import CytoViewer from "~/components/graphviz/GraphvizViewer.vue";

	let cy: IGraphViewer;
	let cyto = ref(null);
	onMounted(async () => {
		cy = <IGraphViewer>(<unknown>cyto.value);
	});

	function change() {
		const g = Graph.create("Erdos");
		cy.loadGraph(g);
	}
</script>

<template>
	<cyto-viewer ref="cyto"></cyto-viewer>

	<client-only>
		<button v-tippy:b class="btn btn-primary" @click="change()">Change</button>
		<tippy target="b" trigger="mouseenter" placement="top">Change stuff</tippy>
	</client-only>
</template>

<style scoped></style>
