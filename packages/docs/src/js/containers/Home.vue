<template>
	<div class="wrapper d-flex flex-column flex-grow-1">
		<hero>
			<div class="container py-5">
				<div class="row">
					<div class="col-md-6">
						<h1>The <u>perfect</u> kit to <u>design</u> your web applications.</h1>
						<p>Try now!</p>
					</div>
				</div>
			</div>
		</hero>

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

