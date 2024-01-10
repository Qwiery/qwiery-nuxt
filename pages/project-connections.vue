<template>
	<h1 class="m-8 dark:text-white-dark">Project Connections</h1>
	<div class="m-8">
		<button type="submit" class="btn btn-primary !mt-6">New Connection</button>
		<form class="mt-3 card">
			<div>Neo4j Connection</div>
			<div class="my-2">
				<label for="project-name">Connection Name:</label>
				<input id="connection-name" type="text" placeholder="Connection 1" class="form-input" />
			</div>
			<div class="columns-2 my-2">
				<div>
					<label for="project-name">Protocol:</label>
					<input id="connection-protocol" type="text" placeholder="bolt" class="form-input" />
				</div>
				<div>
					<label for="project-name">Host:</label>
					<input id="connection-host" type="text" placeholder="localhost" class="form-input" />
				</div>
			</div>
			<div class="columns-2 my-2">
				<div>
					<label for="project-name">Username:</label>
					<input id="connection-protocol" type="text" placeholder="neo4j" class="form-input" />
				</div>
				<div>
					<label for="project-name">Password:</label>
					<input id="connection-host" type="text" placeholder="neo4j" class="form-input" />
				</div>
			</div>

			<button type="submit" class="btn btn-primary !mt-6">Save</button>
		</form>
	</div>
</template>
<script setup lang="ts"></script>
<style>
	.card {
		@apply border rounded max-w-lg p-5 dark:border-dark;
	}
</style>
