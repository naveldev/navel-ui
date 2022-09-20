<template>
	<div class="wrapcontent d-flex flex-grow-1">
		<navigation />

		<router-view v-slot="{ Component, route }">
			<!-- Use any custom transition and fallback to `fade` -->
			<transition :name="route.meta.transition || 'animation-fade'" :mode="route.meta.animationMode || 'out-in'" appear>
				<div class="flex-grow-1" :key="route.name">
					<component :is="Component"></component>
				</div>
			</transition>
		</router-view>
	</div>
</template>

<script>
	import Navigation from './_SideNavigation.vue'

	export default {
		name: 'BaseContainer',

		components: {
			Navigation
		}
	}
</script>

<style scoped>
.wrapcontent {
	position: relative;
	height: 100% !important;
}
</style>
