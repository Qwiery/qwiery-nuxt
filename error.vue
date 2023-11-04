<template>
	<div class="relative flex min-h-screen items-center justify-center overflow-hidden">
		<div>
			<div class="relative">
				<p class="mt-5 text-base dark:text-white">The page you requested was not found.</p>
				<NuxtLink to="/" class="btn btn-primary mx-auto !mt-7 w-max border-0 uppercase shadow-none">Home</NuxtLink>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { useAppStore } from "@/stores/index";
	const store = useAppStore();
	useHead({ title: "Error 404" });
	// definePageMeta({
	// 	layout: "auth-layout",
	// });
</script>
