<template>
	<splitpanes class="!h-[85vh] overflow-hidden" :push-other-panes="false">
		<pane size="20" v-if="isLeftVisible" class="!bg-white">
			<div class="">
				<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isLeftVisible = !isLeftVisible">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
				</svg>
				<TabGroup as="div" class="mx-2 mb-5 mt-1">
					<TabList class="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
						<Tab as="template" v-slot="{ selected }">
							<a
								href="javascript:;"
								class="-mb-[1px] block border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
								:class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
								>Categories</a
							>
						</Tab>
						<Tab as="template" v-slot="{ selected }">
							<div
								class="-mb-[1px] block cursor-pointer border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
								:class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
							>
								Relationships
							</div>
						</Tab>

						<Tab as="template" disabled>
							<a href="javascript:;" class="pointer-events-none -mb-[1px] block p-3.5 py-2 text-white-light dark:text-dark">Saved Cypher</a>
						</Tab>
					</TabList>
					<TabPanels class="flex-1 pt-5 text-sm">
						<TabPanel>
							<div class="columns-2">
								<div class="flex">
									<svg class="h-[19px] w-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<span class="ml-2">Add category</span>
								</div>
								<div class="float-right mr-2">
									<svg v-tippy:info class="h-[19px] w-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<tippy target="info" trigger="mouseenter" placement="top">Popover on info</tippy>
								</div>
							</div>
							<div v-for="i in 10" class="my-3 rounded-md border border-gray-300 p-4">
								<span class="badge bg-emerald-600">Category {{ i }}</span>
								<span class="float-right">1 label</span>
							</div>
						</TabPanel>
						<TabPanel>
							<div class="flex items-start">
								<div class="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
									<img src="/assets/images/profile-34.jpeg" alt="" class="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark" />
								</div>
								<div class="flex-auto">
									<h5 class="mb-4 text-xl font-medium">Media heading</h5>
									<p class="text-white-dark">
										Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
									</p>
								</div>
							</div>
						</TabPanel>
						<TabPanel>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</TabPanel>
						<TabPanel>Disabled</TabPanel>
					</TabPanels>
				</TabGroup>
			</div>
		</pane>
		<pane size="60">
			<splitpanes horizontal>
				<pane size="10" v-if="isTopVisible">
					<div>
						<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isTopVisible = !isTopVisible">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
					</div>
				</pane>
				<pane size="70">
					<auto-search @query="onQuery"></auto-search>
					<cyto-viewer ref="viewerControl"></cyto-viewer>
					<div v-if="showSpinner" class="absolute inset-0 flex justify-center items-center z-10">
						<spinner></spinner>
					</div>
				</pane>
				<pane size="20" v-if="isBottomVisible">
					<div>
						<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isBottomVisible = !isBottomVisible">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
						Bottom
					</div>
				</pane>
			</splitpanes>
		</pane>
		<pane size="20" v-if="isRightVisible">
			<div>
				<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isRightVisible = !isRightVisible">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
				</svg>
				Right
			</div>
		</pane>
	</splitpanes>
</template>
<script setup lang="ts">
	import { Pane, Splitpanes } from "splitpanes";
	import "splitpanes/dist/splitpanes.css";
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
	import AutoSearch from "~/pages/components/autoSearch/autoSearch.vue";
	import CytoViewer from "~/pages/components/graphviz/cytoscape/cytoViewer.vue";
	import GraphAPI from "~/utils/GraphAPI";
	import { GraphStyle } from "~/utils/enums";
	import { Toasts } from "~/composables/notifications";

	let isLeftVisible = ref(false);
	let isRightVisible = ref(false);
	let isTopVisible = ref(false);
	let isBottomVisible = ref(false);
	let viewer: IGraphViewer;
	let viewerControl = ref(null);
	let showSpinner = ref(false);
	definePageMeta({
		layout: "default",
	});
	useHead({
		title: "Graph Explorer",
	});
	onMounted(() => {
		viewer = <IGraphViewer>(<unknown>viewerControl.value);
	});

	async function onQuery(queryPath: string[]) {
		showSpinner.value = true;
		console.log("Path Query >>: " + queryPath.join(" "));

		try {
			if (!viewer) {
				return Toasts.error("Graph viewer surface is not initialized.");
			}
			viewer.clear();
			const g = await GraphAPI.pathQuery(queryPath, 10);
			await new Promise((r) => setTimeout(r, 2000));
			if (g) {
				viewer.loadGraph(g);
				viewer.setStyle(GraphStyle.Default);
			} else {
				Toasts.error("The data could not be loaded.");
			}
		} catch (e: any) {
			Toasts.error(e.message);
		} finally {
			showSpinner.value = false;
		}
	}
</script>
<style scoped></style>
