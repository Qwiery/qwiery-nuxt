<template>
	<div>
		<div class="fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]" :class="{ '!block': store.showAppSettings }" @click="store.toggleAppSettings()"></div>

		<nav class="fixed bottom-0 top-0 z-[51] w-full max-w-[400px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 ltr:-right-[400px] rtl:-left-[400px] dark:bg-[#333333]" :class="{ 'ltr:!right-0 rtl:!left-0': store.showAppSettings }">
			<client-only>
				<perfect-scrollbar
					:options="{
						swipeEasing: true,
						wheelPropagation: false,
					}"
					class="relative h-full overflow-x-hidden ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3"
				>
					<div>
						<div class="relative pb-5 text-center">
							<a href="javascript:" class="absolute top-0 opacity-30 hover:opacity-100 ltr:right-0 rtl:left-0 dark:text-white" @click="store.toggleAppSettings()">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</a>
							<h4 class="mb-1 dark:text-white uppercase">application settings</h4>
							<p class="text-white-dark text-xs">set preferences and more</p>
							<hr class="w-full h-[1px] mx-auto my-4 bg-primary-dark-light border-0 rounded dark:bg-primary" />
							<p class="text-primary text-left dark:text-primary-light/50">This will load a knowledge graph and completely reset all changes you have made to the data.</p>
							<Listbox v-model="selectedLabel" @update:modelValue="labelChanged">
								<div class="relative my-2 !h-8 mr-2">
									<ListboxButton class="relative w-full rounded border border-primary/50 py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm cursor-pointer">
										<span v-if="selectedLabel" class="block truncate text-primary dark:text-primary-light/50">{{ selectedLabel.name }}</span>
										<span v-else class="block truncate text-primary dark:text-primary-light/50">Dataset</span>
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
							<button class="btn btn-primary float-right my-2 mr-2 shadow-none" @click="loadSelectedGraph()">Load</button>
							<hr class="w-full h-[1px] mx-auto my-4 bg-primary-dark-light border-0 rounded dark:bg-primary" />
							<p class="text-primary text-left dark:text-primary-light/50">If enabled, all changes will be committed to the database. If disabled, changes are client-side only.</p>
							<!--Changes checkbox-->
							<label class="inline-flex float-left my-2">
								<input type="checkbox" class="form-checkbox rounded-full !border-primary dark:!border-primary-light/50" :checked="store.commitGraphChanges" @change="commitChanged" />
								<span class="text-primary text-left dark:text-primary-light/50">Commit graph changes</span>
							</label>
							<hr class="w-full h-[1px] mx-auto my-4 bg-primary-dark-light border-0 rounded dark:bg-primary" />
						</div>
						<div class="hidden mb-3 rounded-md border border-dashed border-[#e0e6ed] p-3 dark:border-[#1b2e4b]">
							<h5 class="mb-1 text-base leading-none dark:text-white">Graph Component</h5>
							<p class="text-xs text-white-dark">Switch between graph visualization components.</p>
							<div class="mt-3 grid grid-cols-3 gap-2">
								<button type="button" class="btn" :class="[store.graphlib === 'cytoscape' ? 'btn-primary' : 'btn-outline-primary']" @click="store.changeGraphlib('cytoscape')">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2">
										<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5"></circle>
										<path d="M12 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path d="M12 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path d="M4 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path d="M22 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
									</svg>
									Cytoscape
								</button>
								<button type="button" class="btn" :class="[store.graphlib === 'yfiles' ? 'btn-primary' : 'btn-outline-primary']" @click="store.changeGraphlib('yfiles')">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2">
										<path
											d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
											fill="currentColor"
										></path>
									</svg>
									yFiles
								</button>
								<button type="button" class="btn" :class="[store.graphlib === 'ogma' ? 'btn-primary' : 'btn-outline-primary']" @click="store.changeGraphlib('ogma')">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2">
										<path
											d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V9Z"
											stroke="currentColor"
											stroke-width="1.5"
										></path>
										<path opacity="0.5" d="M22 21H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path opacity="0.5" d="M15 15H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
									</svg>
									Ogma
								</button>
								<button type="button" class="btn" :class="[store.graphlib === 'gojs' ? 'btn-primary' : 'btn-outline-primary']" @click="store.changeGraphlib('gojs')">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2">
										<path
											d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V9Z"
											stroke="currentColor"
											stroke-width="1.5"
										></path>
										<path opacity="0.5" d="M22 21H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
										<path opacity="0.5" d="M15 15H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
									</svg>
									GoJS
								</button>
							</div>
						</div>
					</div>
				</perfect-scrollbar>
			</client-only>
		</nav>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import { useAppStore } from "@/stores/index";
	import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
	import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

	const selectedLabel = ref<any>(null);
	const store = useAppStore();
	const labels = ref<{ name: string }[]>([{ name: "Food" }]);

	function labelChanged(selectedItem: any) {}

	function loadSelectedGraph() {
		if (selectedLabel && !Utils.isEmpty(selectedLabel.value.name)) {
			GraphAPI.loadGraph(selectedLabel.value.name);
			Toasts.info(`The graph '${selectedLabel.value.name}' has been loaded.`);
		}
	}

	function commitChanged(e) {
		const shouldCommit = e.target.checked;
		store.commitClientChanges(shouldCommit);
	}
</script>
