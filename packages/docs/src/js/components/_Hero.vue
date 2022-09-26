<template>
	<header class="hero hero-primary hero-dark">
		<v-navigation class="nav-transparent" />

		<div class="container py-5">
			Hi
		</div>
	</header>
</template>

<script>
	import VNavigation from './_Navigation.vue'

	export default {
		name: 'Hero',

		components: {
			VNavigation
		}
	}
</script>
