<template>
	<h1 class="m-8 dark:text-white-dark">Project Settings</h1>
	<form class="m-5 card">
		<div class="my-2">
			<label for="project-name">Project Name:</label>
			<input id="project-name" type="text" placeholder="Project 1" class="form-input" />
		</div>
		<div class="my-2">
			<label for="project-description">Project Description:</label>
			<textarea id="project-description" rows="20" class="form-textarea ltr:rounded-l-none rtl:rounded-r-none">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a mauris mollis, pellentesque metus nec, fermentum nunc. Nunc tempor maximus erat, faucibus laoreet lorem finibus non. Aenean molestie tellus lacus, elementum porttitor nunc molestie in. Sed sollicitudin lacus eu lectus commodo sagittis. Nulla facilisi. Vivamus vitae nulla blandit, semper lorem non, viverra elit. Nunc maximus tellus vel diam mattis imperdiet. Ut aliquam molestie magna, sit amet euismod neque eleifend at. Vestibulum ut dictum neque. Donec nisl nisi, consequat fermentum ultricies eget, sagittis in ex.

Suspendisse dapibus feugiat venenatis. Maecenas rhoncus elit a aliquam porttitor. Phasellus suscipit eget velit eget tincidunt. Sed non euismod nibh, vitae dapibus arcu. Nullam in tortor augue. Ut varius tortor id dapibus fermentum. Donec pretium sed quam ut varius. Vivamus malesuada feugiat mauris nec laoreet. Integer ac suscipit est, non scelerisque lectus.

Morbi non massa ut ipsum bibendum malesuada. Integer vitae faucibus sapien. In hac habitasse platea dictumst. Praesent vitae velit augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin sodales nisi vitae iaculis mattis. Pellentesque pretium, dui non interdum ullamcorper, nibh elit consectetur arcu, quis sollicitudin libero nunc eget velit. Etiam vestibulum ex at velit suscipit fermentum et sed ipsum. Duis a sollicitudin turpis. Aliquam in magna tempus, laoreet lorem in, pellentesque dui. Morbi lacinia turpis nec augue condimentum cursus. Ut a blandit urna. Quisque vitae convallis urna. Suspendisse ac congue nisi. Quisque semper egestas quam. Mauris bibendum enim lacus, ut tincidunt ligula vestibulum sed.

Mauris et diam convallis, vulputate felis tincidunt, faucibus magna. Sed sollicitudin orci ligula, vel gravida magna malesuada sit amet. Ut imperdiet justo dolor, a pretium purus accumsan nec. Ut lobortis urna a dictum tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas dignissim nec justo vitae sollicitudin. Vivamus eu laoreet risus, lacinia volutpat felis. Vivamus fermentum et eros et sollicitudin. Nam eget tortor ultrices, luctus erat ac, gravida neque. Sed pulvinar aliquet massa. Praesent varius rhoncus sagittis.

Integer maximus quam orci, nec sollicitudin mauris cursus a. Suspendisse ut maximus erat. Pellentesque sit amet urna imperdiet, rhoncus ligula sed, cursus lacus. Mauris nunc purus, pharetra placerat condimentum eu, ultricies vel ligula. Vivamus maximus mauris ut justo feugiat viverra. Nullam semper accumsan gravida. Praesent a tempor massa. Sed convallis quis tortor vel viverra.
			</textarea
			>
		</div>
		<button type="submit" class="btn btn-primary !mt-6">Save</button>
	</form>
</template>
<script setup lang="ts"></script>
<style>
	.card {
		@apply border rounded max-w-lg p-5 dark:border-dark;
	}
</style>
