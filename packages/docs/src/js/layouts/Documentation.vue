<template>
	<div class="wrapper d-flex flex-column flex-grow-1">
		<navigation />

		<div class="wrapcontent d-flex flex-grow-1">
			<side-navigation />

			<router-view v-slot="{ Component, route }">
				<!-- Use any custom transition and fallback to `fade` -->
				<transition :name="route.meta.transition || 'animation-fade'" :mode="route.meta.animationMode || 'out-in'" appear>
					<div class="flex-grow-1" :key="route.name">
						<component :is="Component"></component>
					</div>
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script>
	import Navigation from '@components/_Navigation.vue'
	import SideNavigation from '@components/_SideNavigation.vue'

	export default {
		name: 'DocumentationLayout',

		components: {
			Navigation,
			SideNavigation,
		}
	}
</script>

<style scoped>
.wrapper {
	position: relative;
	min-height: 100vh;
}
.wrapcontent {
	position: relative;
	height: 100% !important;
}
</style>
