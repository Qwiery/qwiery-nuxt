<template>
	<div>
		<h1 class="m-8 dark:text-white-dark">Projects</h1>
		<div class="lg:columns-4 md:columns-2 sm:columns-1 m-12">
			<div>
				<div class="ml-1 project-card cursor-pointer" @click="navigate('project1')">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-blue-700 bg-blue-400" title="Project Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<p class="text-sm text-orange-300 flex items-center">
								<svg class="fill-current text-orange-300 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
								</svg>
								Members only
							</p>
							<div class="text-gray-500 dark:text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">The Graph Database Landscape</div>
							<p class="text-gray-500 text-base">A graph about graph databases and their scope.</p>
						</div>
						<div class="flex items-center">
							<div class="text-sm">
								<p class="text-gray-600">Aug 18, 2024</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="m-1 project-card">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-blue-700 bg-blue-400" title="Project Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<div class="text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">Food &amp; Recipes</div>
							<p class="text-gray-500 text-base">A large graphs about everything delicious.</p>
						</div>
						<div class="flex items-center">
							<div class="text-sm">
								<p class="text-gray-600">Aug 18, 2024</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="m-1 project-card">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-blue-700 bg-blue-400" title="Project Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<div class="text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">Fraud Detection</div>
							<p class="text-gray-500 text-base">A typical dataset covering bank fraud detection scenarios.</p>
						</div>
						<div class="flex items-center">
							<div class="text-sm">
								<p class="text-gray-600">Sept 23, 2024</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="m-1 project-card">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-blue-700 bg-blue-400" title="Project Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<div class="text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">Drug Repurposing</div>
							<p class="text-gray-500 text-base">A comprehensive biological knowledge graph relating genes, compounds, diseases, biological processes, side effects and symptoms.</p>
						</div>
						<div class="flex items-center">
							<div class="text-sm">
								<p class="text-gray-600">Sept 23, 2024</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<h1 class="m-8 dark:text-white-dark">Documentation</h1>
		<div class="lg:columns-4 md:columns-2 sm:columns-1 m-12">
			<div>
				<div class="ml-1 documentation-card" @click="navigate('qwiery')">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-gray-700 bg-gray-200" title="Documentation Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<p class="text-sm text-orange-300 flex items-center">
								<svg class="fill-current text-orange-300 w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
										stroke-width="2"
									></path>
								</svg>
								Guide
							</p>
							<div class="text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">What is Qwiery?</div>
							<p class="text-gray-500 text-base overflow-hidden overflow-ellipsis max-h-[120px]">
								This app is yours (MIT license) and we put a lot of time into making it modular and easy to use. It's composed of many components and this (Vue/Nuxt) app is just an example of how to assemble these components.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="m-1 documentation-card" @click="navigate('dal')">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-gray-700 bg-gray-200" title="Documentation Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<p class="text-sm text-orange-300 flex items-center">
								<svg class="fill-current text-orange-300 w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
										stroke-width="2"
									></path>
								</svg>
								Guide
							</p>
							<div class="text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">Backend Data Access</div>
							<p class="text-gray-500 text-base">How to connect diverse graph databases (Neo4j, AWS Neptune...) or emulate a graph store (JSON, MongoDB...).</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="m-1 documentation-card">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-gray-700 bg-gray-200" title="Documentation Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<p class="text-sm text-orange-300 flex items-center">
								<svg class="fill-current text-orange-300 w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
										stroke-width="2"
									></path>
								</svg>
								Guide
							</p>
							<div class="text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">Graph Visualization Packages</div>
							<p class="text-gray-500 text-base">
								We provide wrappers around <span class="cursor-pointer font-bold text-secondary" @click="navigate('cytoscape')" title="About the Cytoscape graph visualization wrapper">Cytoscape</span>,
								<span class="cursor-pointer font-bold text-secondary" @click="navigate('yfiles')" title="About the yFiles graph visualization wrapper">yFiles</span>,
								<span class="cursor-pointer font-bold text-secondary" @click="navigate('cytoscape')" title="About the Linkurious Ogma graph visualization wrapper">Ogma</span> and
								<span class="cursor-pointer font-bold text-secondary" @click="navigate('gojs')" title="About the GoJs graph visualization wrapper">GoJs</span>.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="m-1 documentation-card" @click="navigate('plugins')">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-gray-700 bg-gray-200" title="Documentation Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<p class="text-sm text-orange-300 flex items-center">
								<svg class="fill-current text-orange-300 w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
										stroke-width="2"
									></path>
								</svg>
								Guide
							</p>
							<div class="text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">Plugins &amp; Data Adapters</div>
							<p class="text-gray-500 text-base">Backend addons can transform data on the fly, validate against a schema and much more.</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="m-1 documentation-card" @click="navigate('faq')">
					<div class="sm:w-5 flex-none bg-cover rounded-l text-center overflow-hidden dark:bg-gray-700 bg-gray-200" title="Documentation Item"></div>
					<div class="p-4 flex flex-col justify-between leading-normal">
						<div class="mb-8">
							<p class="text-sm text-orange-300 flex items-center">
								<svg class="fill-current text-orange-300 w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
										stroke-width="2"
									></path>
								</svg>
								Guide
							</p>
							<div class="text-gray-500 dark:text-gray-300 font-bold text-xl mb-2">FAQ</div>
							<p class="text-gray-500 text-base">We're here to help.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { QwieryInfo } from "../utils";
	import GraphAPI from "~/utils/GraphAPI";

	useHead({
		title: "Qwiery - Projects",
		meta: [
			{
				name: "description",
				content: "The landing page of the Qwiery application.",
			},
		],
	});
	definePageMeta({
		layout: "landing",
	});

	let info = QwieryInfo();
	// let n = await GraphAPI.createNode({ name: "Swa" });
</script>
<style>
	.project-card {
		@apply rounded max-lg:rounded-l max-w-sm w-full lg:max-w-full md:flex dark:bg-[#333333] h-[260px] border dark:border-gray-700;
	}
	.documentation-card {
		@apply rounded max-lg:rounded-l max-w-sm w-full lg:max-w-full md:flex dark:bg-[#333333] h-[220px] cursor-pointer border dark:border-gray-600;
	}
</style>
