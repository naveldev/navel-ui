<template>
	<div class="wrapper d-flex flex-column flex-grow-1">
		<navigation />

		<router-view />
	</div>
</template>

<script>
	import Navigation from '@components/_Navigation.vue'

	export default {
		name: 'DefaultLayout',

		components: {
			Navigation
		}
	}
</script>

<style scoped>
.wrapper {
	position: relative;
	min-height: 100vh;
}
</style>
