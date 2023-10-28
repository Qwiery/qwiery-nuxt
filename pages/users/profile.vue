<template>
	<div>
		<h1>{{ store.user.name }}</h1>
		<button class="btn btn-primary" @click="change()">Change</button>
	</div>
</template>
<script setup lang="ts">
	import { useAppStore } from "@/stores/index";
	const store = useAppStore();
	function change() {
		store.user.name = "John Senior";
		store.user.nickname = "Jay";
		store.user.email = "jay@nuxt.com";
	}
</script>
<style scoped></style>
