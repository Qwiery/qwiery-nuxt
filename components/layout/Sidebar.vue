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
								<h2 class="-mx-4 mb-1 flex items-center bg-gray-200 dark:bg-gray-400 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
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

	import { useAppStore } from "@/stores/index";
	import HeightCollapsible from "vue-height-collapsible/vue3";

	const store = useAppStore();
	const activeDropdown: any = ref("");
	const subActive: any = ref("");

	const tree = [
		{
			id: "32af6d81-ca32-4b7a-b673-e143b0de8ab8",
			text: "Explorations",
			children: [
				{
					id: "6b36c2b1-eea2-451c-ae98-44939c94f3fd",
					text: "Recipes",
					link: "/apps/generic/editor",
				},
				{
					id: "4703e081-35a4-4a8f-bbfc-17634d99c582",
					text: "Schema",
					link: "/apps/generic/schema",
				},
			],
		},
		{
			id: "e78f96d5-6510-4144-ae34-bc6b899c3ada",
			text: "Perspectives",
			children: [
				{
					id: "2ec5969d-d8d2-4590-94c2-c197cbd7f6cf",
					text: "Thai Food",
					link: "/apps/generic/viewer",
				},
				{
					id: "df65783f-022c-4cc4-8d99-3609075fda99",
					text: "Italian Food",
				},
			],
		},
		{
			id: "8b0229ad-7930-4bae-b983-34996ede5138",
			text: "Notebooks",
			children: [
				{
					id: "d9281007-6ef9-4026-961f-9dde18fdc546",
					text: "Notebook 1",
				},
				{
					id: "b3caa701-66c2-4666-9efa-d0d0d076f5bb",
					text: "Notebook 2",
				},
			],
		},
		{
			id: "eec4a6de-7416-49a5-b2ad-5c4dc358c5a5",
			text: "Dashboards",
			children: [
				{
					id: "ad3362fe-3f5f-4742-82d0-496d0b3d84f7",
					text: "Dashboard 1",
				},
				{
					id: "9558f7df-e7a6-4738-a892-7a8421b787cc",
					text: "Dashboard 2",
				},
			],
		},
		{
			id: "c00b7107-973b-417b-a6ba-e292e4271693",
			text: "Datasets",
			children: [
				{
					id: "81e58cb5-7f98-422b-98c4-3b67525d7c3d",
					text: "Dataset 1",
				},
				{
					id: "17eaea24-5cac-41e5-a014-2afdb638bbde",
					text: "Dataset 2",
				},
			],
		},
	];
	onMounted(() => {
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
</script>
