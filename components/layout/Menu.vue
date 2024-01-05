<template>
	<header class="z-40">
		<div class="relative flex">
			<div class="dark:bg-[#333333] dark:text-dark-light sm:flex-1">
				<!--Current graph library-->
				<div class="m-2 cursor-pointer" title="Documentation and More" @click="navigate('qwiery')">Qwiery.com</div>
			</div>
			<div class="flex items-center dark:text-dark">
				<svg role="img" class="w-[16px] dark:fill-dark mx-[7px] cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="navigate('github')">
					<title>GitHub</title>
					<path
						d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
					></path>
				</svg>
				<svg role="img" class="w-[16px] dark:fill-dark mx-[7px] cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="navigate('twitter')">
					<title>X/Twitter</title>
					<path
						d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z"
					></path>
				</svg>

				<svg class="w-[16px] mx-[7px] cursor-pointer dark:fill-dark dark:stroke-dark" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="navigate('orbifold')">
					<title>Orbifold Consulting</title>
					<path
						d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
						stroke-width="5"
					></path>
				</svg>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	import { ref, onMounted, computed, reactive, watch } from "vue";

	import appSetting from "@/app-setting";

	import { useRoute } from "vue-router";
	import { useAppStore } from "@/stores/index";

	const store = useAppStore();
	const route = useRoute();
	const search = ref(false);
	const { setLocale } = useI18n();

	// multi language
	const changeLanguage = (item: any) => {
		appSetting.toggleLanguage(item, setLocale);
	};
	const currentFlag = computed(() => {
		return `/images/flags/${store.locale?.toUpperCase()}.svg`;
	});

	const notifications = ref([
		{
			id: 1,
			profile: "/images/anonymous.png",
			message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
			time: "45 min ago",
		},
		{
			id: 2,
			profile: "/images/anonymous.png",
			message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
			time: "9h Ago",
		},
		{
			id: 3,
			profile: "/images/anonymous.png",
			message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
			time: "9h Ago",
		},
	]);

	const messages = ref([
		{
			id: 1,
			image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
			title: "Congratulations!",
			message: "Your OS has been updated.",
			time: "1hr",
		},
		{
			id: 2,
			image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
			title: "Did you know?",
			message: "You can switch between artboards.",
			time: "2hr",
		},
		{
			id: 3,
			image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
			title: "Something went wrong!",
			message: "Send Reposrt",
			time: "2days",
		},
		{
			id: 4,
			image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
			title: "Warning",
			message: "Your password strength is low.",
			time: "5days",
		},
	]);

	onMounted(() => {
		setActiveDropdown();
	});

	watch(route, (to, from) => {
		setActiveDropdown();
	});

	const setActiveDropdown = () => {
		const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
		if (selector) {
			selector.classList.add("active");
			const all: any = document.querySelectorAll("ul.horizontal-menu .nav-link.active");
			for (let i = 0; i < all.length; i++) {
				all[0]?.classList.remove("active");
			}
			const ul: any = selector.closest("ul.sub-menu");
			if (ul) {
				let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link");
				if (ele) {
					ele = ele[0];
					setTimeout(() => {
						ele?.classList.add("active");
					});
				}
			}
		}
	};

	const removeNotification = (value: number) => {
		notifications.value = notifications.value.filter((d) => d.id !== value);
	};

	const removeMessage = (value: number) => {
		messages.value = messages.value.filter((d) => d.id !== value);
	};
</script>
