<template>
	<div class="wrapper d-flex flex-column flex-grow-1">
		<hero />

		Home
	</div>
</template>

<script>
	import Hero from '@components/_Hero.vue'

	export default {
		layout: 'Stylesheet',

		components: {
			Hero
		}
	}
</script>

<style scoped>
.wrapper {
	position: relative;
	min-height: 100vh;
}
</style>

