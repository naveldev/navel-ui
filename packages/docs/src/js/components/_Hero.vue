<template>
	<header class="hero hero-primary hero-dark">
		<v-navigation class="nav-transparent" />

		<slot />
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
