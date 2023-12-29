<template>
	<CytoscapeViewer class="h-[70vh] bg-amber-300" ref="cyto"></CytoscapeViewer>
	<auto-search-dialog ref="dialogControl" @on-query="onQuery"></auto-search-dialog>
	<client-only>
		<button v-tippy:b class="btn btn-primary" @click="autoSearchDialog.show()">Show Modal</button>
		<button v-tippy:b class="btn btn-primary" @click="change()">Change</button>
		<tippy target="b" trigger="mouseenter" placement="top">Change stuff</tippy>
	</client-only>
</template>
<script setup lang="ts">
	import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
	import AutoSearchDialog from "~/components/autoSearchDialog/autoSearchDialog.vue";
	import { CytoscapeViewer } from "@orbifold/vue-cytoscape";
	import type { IGraphView } from "@orbifold/utils";

	let dialogControl = ref<any>(null);
	let autoSearchDialog: any;

	let cy: IGraphView;
	let cyto = ref(null);
	onMounted(async () => {
		cy = <IGraphView>(<unknown>cyto.value);
		autoSearchDialog = <unknown>dialogControl.value;

		setTimeout(() => {
			autoSearchDialog.show();
		}, 200);
	});

	function onQuery(queryPath: string[]) {
		console.log(queryPath);
	}

	function change() {
		const g = Graph.create("Erdos");
		cy.loadGraph(g);
	}
</script>

<style scoped></style>
