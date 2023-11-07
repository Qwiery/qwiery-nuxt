<template>
	<div>
		<h1>{{ info.title }}</h1>
		<small>{{ info.description }}</small>
	</div>
</template>

<script setup lang="ts">
	import { QwieryInfo } from "../utils";
	import GraphAPI from "~/utils/GraphAPI";

	useHead({
		title: "Home",
	});

	let info = QwieryInfo();
	// let n = await GraphAPI.createNode({ name: "Swa" });
</script>
