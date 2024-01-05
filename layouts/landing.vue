<template>
	<div class="dark:bg-[#282828]">
		<div class="relative">
			<Menu />
			<Banner></Banner>
			<div class="p-2 dark:bg-[#282828]">
				<NuxtPage />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import Menu from "~/components/layout/Menu.vue";
	import { ref, onMounted } from "vue";
	import appSetting from "@/app-setting";
	import Banner from "~/components/layout/Banner.vue";
	const { setLocale } = useI18n();
	onMounted(() => {
		// set default settings
		appSetting.init(setLocale);
	});
</script>
