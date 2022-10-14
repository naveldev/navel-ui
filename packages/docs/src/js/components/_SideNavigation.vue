<template>
	<nav class="nav-left d-xs-none d-md-block p-3">
		<!-- Getting Started -->
		<div class="nav-label">
			<div class="label-icon">
				<i class="fa-regular fa-house"></i>
			</div>

			<p>Getting Started</p>
		</div>

		<ul class="nav-list">
			<li class="nav-item">
				<router-link class="nav-link" :to="{ name: 'docs' }">
					Getting Started
				</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{ name: 'docs.installation' }">
					Installation
				</router-link>
			</li>
		</ul>
		
		<!-- Components -->
		<div class="nav-label mt-3">
			<div class="label-icon">
				<i class="fa-regular fa-layer-group"></i>
			</div>

			<p>Components</p>
		</div>

		<ul class="nav-list">
			<li class="nav-item">
				<router-link class="nav-link" :to="{ name: 'docs.components.button' }">
					Button
				</router-link>
			</li>
		</ul>
		
		<!-- Vue Components -->
		<div class="nav-label mt-3">
			<div class="label-icon">
				<i class="fa-brands fa-vuejs"></i>
			</div>

			<p>Vue Components</p>
		</div>

		<ul class="nav-list">
			<li class="nav-item">
				<router-link class="nav-link" :to="{ name: 'docs.vue' }">
					Installation
				</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{ name: 'docs.vue.components.input' }">
					Input
				</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{ name: 'docs.vue.components.datepicker' }">
					DatePicker
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'SideNavigation',
	}
</script>

<style scoped>
.nav-left {
    min-width: 300px;
    height: auto;
}
.nav-left label
{
    text-transform: uppercase;
    color: rgb(var(--color-muted));
    display: block;
    padding: 15px;
    font-size: 14px;
}
</style>
