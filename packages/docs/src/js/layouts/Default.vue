<template>
	<div class="wrapper d-flex flex-column flex-grow-1">
		<navigation />

		<router-view />
	</div>
</template>

<script>
	import Navigation from '@partials/Navigation.vue'

	export default {
		name: 'DefaultLayout',

		components: {
			Navigation
		}
	}
</script>
