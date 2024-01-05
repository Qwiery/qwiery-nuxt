<template>
	<div class="relative">
		<img src="/images/fibers.jpg" alt="Fibers Rendering" class="object-cover h-48 w-[100vw] opacity-50 grayscale" />
		<h1 class="absolute text-8xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{ info.name }}</h1>
		<h2 class="absolute text-xl text-white opacity-50 bottom-4 left-1/2 -translate-x-1/2">From Complexity to Clarity</h2>
		<h3 class="hidden absolute text-2xl text-blue-300 top-5 left-5">All about graphs</h3>
		<h3 class="absolute text-sm text-white opacity-50 bottom-5 right-5">v{{ info.version }}</h3>
	</div>
</template>
<script setup lang="ts">
	import { QwieryInfo } from "~/utils";

	let info = QwieryInfo();
</script>
