<script setup lang="ts">
	import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
	import AutoSearchDialog from "~/components/autoSearchDialog/autoSearchDialog.vue";

	let dialogControl = ref<any>(null);
	let autoSearchDialog: any;

	let cy: IGraphViewer;
	let cyto = ref(null);
	onMounted(async () => {
		cy = <IGraphViewer>(<unknown>cyto.value);
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

<template>
	<graphviz-viewer ref="cyto"></graphviz-viewer>
	<auto-search-dialog ref="dialogControl" @on-query="onQuery"></auto-search-dialog>
	<client-only>
		<button v-tippy:b class="btn btn-primary" @click="autoSearchDialog.show()">Show Modal</button>
		<button v-tippy:b class="btn btn-primary" @click="change()">Change</button>
		<tippy target="b" trigger="mouseenter" placement="top">Change stuff</tippy>
	</client-only>
</template>

<style scoped></style>
