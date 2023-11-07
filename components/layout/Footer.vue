<template>
	<div class="border-t border-primary-dark-light mt-auto p-6 flex">
		<div class="dark:text-white-dark sm:text-left">
			<a title="We help companies turn multi-dimensional data into actionable insights through graph analytics and graph visualizations." href="https://orbifold.net" target="_blank">©{{ new Date().getFullYear() }} Orbifold Consulting</a>.
		</div>
		<div class="justify-center mx-auto">
			<a title="Your productivity toolbox to create graph-driven apps." href="https://github.com/Qwiery/qwiery-nuxt" target="_blank">{{ info.title }}</a>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {QwieryInfo} from "~/utils";

    const info = QwieryInfo();
</script>
