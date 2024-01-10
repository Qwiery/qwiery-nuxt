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
						class="relative h-[calc(100vh-80px)]"
					>
						<!--Top level enum-->
						<ul class="relative space-y-0.5 p-4 py-0 font-semibold">
							<!--Dynamic-->
							<template v-for="section in tree" :key="section.text">
								<h2 class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
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
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path
																d="M11.1459 7.02251C11.5259 6.34084 11.7159 6 12 6C12.2841 6 12.4741 6.34084 12.8541 7.02251L12.9524 7.19887C13.0603 7.39258 13.1143 7.48944 13.1985 7.55334C13.2827 7.61725 13.3875 7.64097 13.5972 7.68841L13.7881 7.73161C14.526 7.89857 14.895 7.98205 14.9828 8.26432C15.0706 8.54659 14.819 8.84072 14.316 9.42898L14.1858 9.58117C14.0429 9.74833 13.9714 9.83191 13.9392 9.93531C13.9071 10.0387 13.9179 10.1502 13.9395 10.3733L13.9592 10.5763C14.0352 11.3612 14.0733 11.7536 13.8435 11.9281C13.6136 12.1025 13.2682 11.9435 12.5773 11.6254L12.3986 11.5431C12.2022 11.4527 12.1041 11.4075 12 11.4075C11.8959 11.4075 11.7978 11.4527 11.6014 11.5431L11.4227 11.6254C10.7318 11.9435 10.3864 12.1025 10.1565 11.9281C9.92674 11.7536 9.96476 11.3612 10.0408 10.5763L10.0605 10.3733C10.0821 10.1502 10.0929 10.0387 10.0608 9.93531C10.0286 9.83191 9.95713 9.74833 9.81418 9.58117L9.68403 9.42898C9.18097 8.84072 8.92945 8.54659 9.01723 8.26432C9.10501 7.98205 9.47396 7.89857 10.2119 7.73161L10.4028 7.68841C10.6125 7.64097 10.7173 7.61725 10.8015 7.55334C10.8857 7.48944 10.9397 7.39258 11.0476 7.19887L11.1459 7.02251Z"
																stroke="currentColor"
																stroke-width="1.5"
															/>
															<path d="M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z" stroke="currentColor" stroke-width="1.5" />
															<path
																d="M12 16.0678L8.22855 19.9728C7.68843 20.5321 7.41837 20.8117 7.18967 20.9084C6.66852 21.1289 6.09042 20.9402 5.81628 20.4602C5.69597 20.2495 5.65848 19.8695 5.5835 19.1095C5.54117 18.6804 5.52 18.4658 5.45575 18.2861C5.31191 17.8838 5.00966 17.5708 4.6211 17.4219C4.44754 17.3554 4.24033 17.3335 3.82589 17.2896C3.09187 17.212 2.72486 17.1732 2.52138 17.0486C2.05772 16.7648 1.87548 16.1662 2.08843 15.6266C2.18188 15.3898 2.45194 15.1102 2.99206 14.5509L5.45575 12"
																stroke="currentColor"
																stroke-width="1.5"
															/>
															<path
																d="M12 16.0678L15.7715 19.9728C16.3116 20.5321 16.5816 20.8117 16.8103 20.9084C17.3315 21.1289 17.9096 20.9402 18.1837 20.4602C18.304 20.2495 18.3415 19.8695 18.4165 19.1095C18.4588 18.6804 18.48 18.4658 18.5442 18.2861C18.6881 17.8838 18.9903 17.5708 19.3789 17.4219C19.5525 17.3554 19.7597 17.3335 20.1741 17.2896C20.9081 17.212 21.2751 17.1732 21.4786 17.0486C21.9423 16.7648 22.1245 16.1662 21.9116 15.6266C21.8181 15.3898 21.5481 15.1102 21.0079 14.5509L18.5442 12"
																stroke="currentColor"
																stroke-width="1.5"
															/>
														</svg>

														<span class="text-black ltr:pl-3 rtl:pr-3 dark:text-primary-light/40 dark:group-hover:text-white-dark">{{ child.text }}</span>
													</div>
												</NuxtLink>
											</li>
										</ul>
									</li>
								</template>
							</template>
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
		{
			id: "aa81764a-c0b3-4fa9-98cb-f268d1334d26",
			text: "Connections",
			children: [
				{
					id: "ccc1a854-dcf2-4e3c-afb8-233138241f08",
					text: "Connection 1",
				},
				{
					id: "3cfef822-06cd-4aae-bfed-c8c85e373aeb",
					text: "Connection 2",
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
