<template>
	<div class="main-section relative font-nunito text-sm font-normal antialiased" :class="[store.sidebar ? 'toggle-sidebar' : '', store.menu, store.layout, store.rtlClass]">
		<!--  BEGIN MAIN CONTAINER  -->
		<div class="relative">
			<!-- sidebar menu overlay -->
			<div class="fixed inset-0 z-50 bg-[black]/60 lg:hidden" :class="{ hidden: !store.sidebar }" @click="store.toggleSidebar()"></div>

			<!-- screen loader -->
			<div v-show="store.isShowMainLoader" class="screen_loader animate__animated fixed inset-0 z-[60] grid place-content-center bg-[#fafafa] dark:bg-[#060818]">
				<spinner></spinner>
			</div>

			<div class="fixed bottom-6 z-50 ltr:right-6 rtl:left-6">
				<template v-if="showTopButton">
					<button type="button" class="btn btn-outline-primary animate-pulse rounded-full bg-[#fafafa] p-2 dark:bg-[#060818] dark:hover:bg-primary" @click="goToTop">
						<svg width="24" height="24" class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M12 20.75C12.4142 20.75 12.75 20.4142 12.75 20L12.75 10.75L11.25 10.75L11.25 20C11.25 20.4142 11.5858 20.75 12 20.75Z" fill="currentColor" />
							<path
								d="M6.00002 10.75C5.69667 10.75 5.4232 10.5673 5.30711 10.287C5.19103 10.0068 5.25519 9.68417 5.46969 9.46967L11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5304 3.46967L18.5304 9.46967C18.7449 9.68417 18.809 10.0068 18.6929 10.287C18.5768 10.5673 18.3034 10.75 18 10.75L6.00002 10.75Z"
								fill="currentColor"
							/>
						</svg>
					</button>
				</template>
			</div>

			<!-- BEGIN APP SETTING LAUNCHER -->
			<theme-customizer />
			<!-- END APP SETTING LAUNCHER -->

			<div class="main-container min-h-screen text-black dark:text-white-dark" :class="[store.navbar]">
				<!--  BEGIN SIDEBAR  -->
				<layout-sidebar />
				<!--  END SIDEBAR  -->

				<div class="main-content flex min-h-screen flex-col">
					<!--  BEGIN TOP NAVBAR  -->
					<layout-header />
					<!--  END TOP NAVBAR  -->

					<!--  BEGIN CONTENT AREA  -->
					<div class="animation p-6">
						<NuxtPage />
					</div>
					<!--  END CONTENT AREA  -->

					<!-- BEGIN FOOTER -->
					<layout-footer />
					<!-- END FOOTER -->
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import appSetting from "@/app-setting";
	import { useAppStore } from "@/stores/index";
	const store = useAppStore();
	const showTopButton = ref(false);
	const { setLocale } = useI18n();
	onMounted(() => {
		// set default settings
		appSetting.init(setLocale);

		window.onscroll = () => {
			if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
				showTopButton.value = true;
			} else {
				showTopButton.value = false;
			}
		};

		const eleanimation: any = document.querySelector(".animation");
		eleanimation.addEventListener("animationend", function () {
			appSetting.changeAnimation("remove");
		});
		store.toggleMainLoader();
	});

	const goToTop = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};
</script>
