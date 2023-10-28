<template>
	<div>
		<h1>{{ info.title }}</h1>
		<small>{{ info.description }}</small>
	</div>
</template>

<script setup lang="ts">
	import { GraphalyzerInfo } from "../utils";

	useHead({
		title: "Home",
	});

	let info = GraphalyzerInfo();
</script>
