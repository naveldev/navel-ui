<template>
	<header class="hero hero-primary">
		<v-navigation class="nav-transparent" />

		<slot />
	</header>
</template>

<script>
	import VNavigation from '@partials/Navigation.vue'

	export default {
		name: 'Hero',

		components: {
			VNavigation
		}
	}
</script>
