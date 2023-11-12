<script setup lang="ts">
	import CytoViewer from "~/components/graphviz/GraphvizViewer.vue";
	import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

	let dataSearchControl = ref<any>(null);
	let dataSearchDialog: any;

	let cy: IGraphViewer;
	let cyto = ref(null);
	onMounted(async () => {
		cy = <IGraphViewer>(<unknown>cyto.value);
		dataSearchDialog = <unknown>dataSearchControl.value;

		setTimeout(() => {
			dataSearchDialog.show();
		}, 200);
	});

	function change() {
		const g = Graph.create("Erdos");
		cy.loadGraph(g);
	}
</script>

<template>
	<cyto-viewer ref="cyto"></cyto-viewer>
	<data-search ref="dataSearchControl"></data-search>
	<client-only>
		<button v-tippy:b class="btn btn-primary" @click="dataSearchDialog.show()">Show Modal</button>
		<button v-tippy:b class="btn btn-primary" @click="change()">Change</button>
		<tippy target="b" trigger="mouseenter" placement="top">Change stuff</tippy>
	</client-only>
</template>

<style scoped></style>
