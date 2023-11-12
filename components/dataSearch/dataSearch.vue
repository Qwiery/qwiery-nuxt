<template>
	<TransitionRoot appear :show="modalShow" as="template">
		<Dialog as="div" @close="modalShow = false" class="relative z-500">
			<!--Background Overlay-->
			<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<DialogOverlay class="fixed inset-0 bg-primary/60" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center px-4 py-8">
					<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
						<DialogPanel class="panel max-h-[60vh] border-0 p-0 rounded-lg overflow-hidden w-6/12 max-w-4xl text-black dark:text-white-dark">
							<!--TopRight Icon-->
							<div class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none">
								<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 150.817 150.817" xml:space="preserve" stroke="currentColor">
									<g>
										<g>
											<path
												d="M58.263,64.946c3.58-8.537,9.834-16.039,18.456-21.02c6.644-3.842,14.225-5.876,21.902-5.876 c6.376,0,12.568,1.461,18.207,4.031V21.677C116.829,9.706,92.563,0,62.641,0C32.71,0,8.448,9.706,8.448,21.677v21.681 C8.436,54.75,30.372,64.061,58.263,64.946z M62.629,5.416c29.77,0,48.768,9.633,48.768,16.255c0,6.634-18.998,16.258-48.768,16.258 c-29.776,0-48.774-9.624-48.774-16.258C13.855,15.049,32.853,5.416,62.629,5.416z M8.429,75.883V54.202 c0,10.973,20.396,20.015,46.841,21.449c-1.053,7.21-0.311,14.699,2.375,21.799C30.055,96.445,8.436,87.184,8.429,75.883z M95.425,125.631c-9.109,2.771-20.457,4.445-32.796,4.445c-29.931,0-54.193-9.706-54.193-21.684V86.709 c0,11.983,24.256,21.684,54.193,21.684c0.341,0,0.673-0.018,1.014-0.018C71.214,118.373,82.827,124.656,95.425,125.631z M131.296,63.11c-10.388-17.987-33.466-24.174-51.46-13.785c-17.987,10.388-24.173,33.463-13.792,51.45 c10.388,17.993,33.478,24.174,51.465,13.798C135.51,104.191,141.684,81.102,131.296,63.11z M71.449,97.657 C62.778,82.66,67.945,63.394,82.955,54.72c15.01-8.662,34.275-3.504,42.946,11.509c8.672,15.013,3.502,34.279-11.508,42.943 C99.377,117.85,80.117,112.686,71.449,97.657z M139.456,133.852l-16.203,9.353l-12.477-21.598l16.209-9.359L139.456,133.852z M137.708,149.562c-4.488,2.582-10.199,1.06-12.794-3.429l16.216-9.353C143.718,141.268,142.184,146.979,137.708,149.562z"
											></path>
										</g>
									</g>
								</svg>
							</div>
							<div class="text-lg font-bold bg-primary-dark-light dark:bg-primary-dark-light ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Search Nodes</div>

							<div class="p-5">
								<div class="flex bg-primary-dark-light px-1 pb-2 mb-2 rounded">
									<client-only>
										<Listbox v-model="selectedLabel" @update:modelValue="labelChanged">
											<div class="relative !w-1/3 my-2 !h-8 mr-2">
												<ListboxButton class="relative w-full rounded border border-primary-dark-light py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm cursor-pointer">
													<span v-if="selectedLabel" class="block truncate">{{ selectedLabel.name }}</span>
													<span v-else class="block truncate">Labels</span>
													<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
														<ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
													</span>
												</ListboxButton>

												<transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
													<ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded z-50 bg-white dark:bg-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
														<ListboxOption v-slot="{ active, selected }" v-for="label in labels" :key="label.name" :value="label" as="template">
															<li :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4 bg-white dark:bg-primary']">
																<span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate text-primary dark:text-white']">{{ label.name }}</span>
																<span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<CheckIcon class="h-5 w-5" aria-hidden="true" />
																</span>
															</li>
														</ListboxOption>
													</ListboxOptions>
												</transition>
											</div>
										</Listbox>
										<Listbox v-model="selectedProperty" @update:modelValue="propertyChanged" v-if="propertiesEnabled">
											<div class="relative !w-1/3 my-2 !h-8 mr-2">
												<ListboxButton class="relative w-full cursor-pointer rounded border border-primary-dark-light py-2 pl-3 pr-10 text-left sm:text-sm">
													<span v-if="selectedProperty" class="block truncate">{{ selectedProperty.name }}</span>
													<span v-else class="block truncate">Properties</span>
													<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
														<ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
													</span>
												</ListboxButton>

												<transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
													<ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded z-50 bg-white dark:bg-primary py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
														<ListboxOption v-slot="{ active, selected }" v-for="property in properties" :key="property.name" :value="property" as="template">
															<li :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4 bg-white dark:bg-primary']">
																<span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate text-primary dark:text-white']">{{ property.name }}</span>
																<span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<CheckIcon class="h-5 w-5" aria-hidden="true" />
																</span>
															</li>
														</ListboxOption>
													</ListboxOptions>
												</transition>
											</div>
										</Listbox>
										<input v-model="searchTerm" type="text" placeholder="Search" class="form-input h-10 mt-2 w-1/3" @keydown.enter="searchNodes()" v-if="searchEnabled" />
										<button class="btn btn-primary" @click="loadSelected()">Load Selected</button>
									</client-only>
								</div>
								<div class="datatable">
									<vue3-datatable
										ref="dataTableControl"
										class="overflow-hidden"
										:stickyHeader="true"
										:rows="rows"
										:columns="cols"
										:totalRows="rows?.length"
										:hasCheckbox="true"
										:sortable="true"
										sortColumn="name"
										:search="searchTerm"
										skin="whitespace-nowrap bh-table-hover"
										firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
										lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
										previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
										nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
									>
										<template #actions="data">
											<div class="flex gap-4">
												<button type="button" class="btn btn-primary !py-1" @click="loadNode(data.value)">Load</button>
											</div>
										</template>
									</vue3-datatable>
								</div>

								<div class="flex justify-end items-center mt-8">
									<button type="button" @click="modalShow = false" class="btn btn-primary ltr:ml-4 rtl:mr-4">OK</button>
								</div>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
<script setup lang="ts">
	import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay, TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
	import Vue3Datatable from "@bhplugin/vue3-datatable";
	import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
	import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

	const dataTableControl = ref<any>(null);
	let datatable: any;
	onMounted(() => {});

	async function loadAllNodeLabels() {
		const allLabels = await GraphAPI.getNodeLabels();
		if (allLabels) {
			labels.value = allLabels.map((name) => ({ name }));
		} else {
			labels.value = [];
		}
	}

	async function loadAllLabelProperties(labelName) {
		const allLabels = await GraphAPI.getNodeLabelProperties(labelName);
		if (allLabels) {
			properties.value = allLabels.map((name) => ({ name }));
		} else {
			properties.value = [];
		}
	}

	function show() {
		modalShow.value = true;
		loadAllNodeLabels();
		selectedLabel.value = null;
		selectedProperty.value = null;
		propertiesEnabled.value = false;
		searchEnabled.value = false;
		rows.value = [];
		searchTerm.value = "";
		setTimeout(() => {
			datatable = <any>(<unknown>dataTableControl.value);
		}, 300);
	}

	function hide() {
		modalShow.value = false;
	}

	const labels = ref<{ name: string }[]>([]);
	const properties = ref<{ name: string }[]>([]);
	const searchTerm = ref("");
	const selectedLabel = ref<any>(null);
	const selectedProperty = ref<any>(null);
	const modalShow = ref(false);
	let searchEnabled = ref(false);
	let propertiesEnabled = ref(false);

	const cols =
		ref([
			{ field: "id", title: "Id", isUnique: true, hide: true },
			{ field: "labels", title: "Labels" },
			{ field: "name", title: "Name" },
			{ field: "actions", title: "Actions" },
		]) || [];

	const rows = ref<{ id: string; labels: string[]; name: string }[]>([]);

	function labelChanged(selectedItem: any) {
		if (selectedItem && !Utils.isEmpty(selectedItem.name)) {
			loadAllLabelProperties(selectedItem.name);
			selectedProperty.value = null;
			searchEnabled.value = true;
			/*
			 * The search box search in the current rowset.
			 * If you want to search in the database you need
			 * to change this behavior.
			 * */
			propertiesEnabled.value = false;
			loadData(selectedItem.name);
		}
	}

	async function loadData(labelName: string, propertyName: string | null = null, searchTerm: string | null = null) {
		if (Utils.isEmpty(labelName)) {
			rows.value = [];
		} else if (Utils.isEmpty(propertyName)) {
			const found = await GraphAPI.getNodesWithLabel(labelName);
			rows.value = <any[]>found;
		}
	}

	function propertyChanged() {
		searchEnabled.value = true;
	}

	async function searchNodes() {
		if (Utils.isEmpty(searchTerm.value)) {
			rows.value = [];
		}
		const labelName = selectedLabel.value;
		const propertyName = selectedProperty.value;

		const found = await GraphAPI.searchNodesWithLabel(searchTerm.value, [propertyName], labelName, 100);
		rows.value = <any[]>found;
	}

	function loadSelected() {
		const sel = <any[]>datatable.getSelectedRows();
		sel.forEach((item) => {
			loadNode(item);
		});
	}
	function loadNode(item) {
		if (!Utils.isEmpty(item.id)) {
			emit("loadId", item.id);
		}
	}

	defineExpose({
		show,
		hide,
	});
	const emit = defineEmits<{
		(e: "loadId", id: string): void;
	}>();
</script>
