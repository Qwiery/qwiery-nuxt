<template>
	<div>
		<nav class="sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] transition-all duration-300">
			<div class="h-full bg-white dark:bg-[#333333]">
				<div class="flex items-center justify-between px-4 py-3">
					<NuxtLink to="/" class="main-logo flex shrink-0 items-center">
						<img class="ml-[5px] w-8 flex-none" src="/images/orbifold.svg" alt="" />
						<span class="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">Qwiery</span>
					</NuxtLink>
					<a href="javascript:" class="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 hover:text-primary rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10" @click="store.toggleSidebar()">
						<svg class="m-auto h-5 w-5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</a>
				</div>
				<client-only>
					<perfect-scrollbar
						:options="{
							swipeEasing: true,
							wheelPropagation: false,
						}"
						class="relative h-[calc(100vh-80px)] mt-1"
					>
						<!--Top level enum-->
						<ul class="relative space-y-0.5 p-4 py-0 font-semibold">
							<!--Dynamic-->
							<template v-for="section in tree" :key="section.text">
								<h2 class="-mx-4 mb-1 flex items-center bg-gray-200 dark:bg-gray-400 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]" :title="section.description">
									<svg class="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
										<line x1="5" y1="12" x2="19" y2="12"></line>
									</svg>
									<span>{{ section.text }}</span>
								</h2>
								<template v-if="section.children && section.children.length > 0">
									<li class="nav-item">
										<ul>
											<li class="nav-item" v-for="child in section.children" :key="child.id">
												<NuxtLink :to="child.link" class="group" @click="toggleMobileMenu">
													<div class="flex items-center">
														<icons-box></icons-box>

														<span class="text-black ltr:pl-3 rtl:pr-3 dark:text-primary-light/40 dark:group-hover:text-white-dark">{{ child.text }}</span>
													</div>
												</NuxtLink>
											</li>
										</ul>
									</li>
								</template>
							</template>
							<h2 class="-mx-4 mb-1 flex items-center bg-gray-200 dark:bg-gray-400 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
								<svg class="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
								<span>Project</span>
							</h2>

							<li class="nav-item">
								<ul>
									<li class="nav-item">
										<NuxtLink to="/project-settings" class="group" @click="toggleMobileMenu">
											<div class="flex items-center">
												<icons-box></icons-box>

												<span class="text-black ltr:pl-3 rtl:pr-3 dark:text-primary-light/40 dark:group-hover:text-white-dark">Settings</span>
											</div>
										</NuxtLink>
									</li>
									<li class="nav-item">
										<NuxtLink to="project-connections" class="group" @click="toggleMobileMenu">
											<div class="flex items-center">
												<icons-box></icons-box>

												<span class="text-black ltr:pl-3 rtl:pr-3 dark:text-primary-light/40 dark:group-hover:text-white-dark">Connections</span>
											</div>
										</NuxtLink>
									</li>
								</ul>
							</li>
						</ul>
					</perfect-scrollbar>
				</client-only>
			</div>
		</nav>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from "vue";
	import appSetting from "@/app-setting";
	import { useAppStore } from "@/stores/index";
	import HeightCollapsible from "vue-height-collapsible/vue3";

	const store = useAppStore();
	const activeDropdown: any = ref("");
	const subActive: any = ref("");

	const tree = appSetting.sidebarTree;
	onMounted(() => {
		// the v-for requires unique ids
		ensureTreeIds(tree);

		setTimeout(() => {
			const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');

			if (selector) {
				selector.classList.add("active");
				const ul: any = selector.closest("ul.sub-menu");
				if (ul) {
					let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link") || [];

					if (ele.length) {
						ele = ele[0];
						setTimeout(() => {
							ele.click();
						});
					}
				}
			}
		});
	});

	const toggleMobileMenu = () => {
		if (window.innerWidth < 1024) {
			store.toggleSidebar();
		}
	};
	let isDevelopment = process.env.NODE_ENV !== "production";

	/**
	 * Ensures that the tree has unique ids.
	 * @param tree The sidebar tree content, sits in app-settings.
	 */
	function ensureTreeIds(tree: any[]): void {
		tree.forEach((section: any) => {
			if (!section.id) {
				section.id = "section-" + Math.random().toString(36).substr(2, 9);
			}
			if (section.children) {
				section.children.forEach((child: any) => {
					if (!child.id) {
						child.id = "child-" + Math.random().toString(36).substr(2, 9);
					}
				});
			}
		});
	}
</script>
