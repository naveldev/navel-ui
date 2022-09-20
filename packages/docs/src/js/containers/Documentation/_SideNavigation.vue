<template>
	<nav class="nav-left">
		<!-- Getting Started -->
		<ul class="nav-list py-3">
			<label class="text-muted">Getting Started</label>
			<li class="nav-item">
				<router-link class="nav-link py-2" :to="{ name: 'docs' }">
					Getting Started
				</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link py-2" :to="{ name: 'docs.installation' }">
					Installation
				</router-link>
			</li>
		</ul>
		
		<!-- Components -->
		<ul class="nav-list py-3">
			<label class="text-muted">Components</label>
			<li class="nav-item">
				<router-link class="nav-link py-2" :to="{ name: 'docs.components.button' }">
					Button
				</router-link>
			</li>
		</ul>
		
		<!-- Vue Components -->
		<ul class="nav-list py-3">
			<label class="text-muted">Vue Components</label>
			<li class="nav-item">
				<router-link class="nav-link py-2" :to="{ name: 'docs.vue' }">
					Installation
				</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link py-2" :to="{ name: 'docs.vue.components.input' }">
					Input
				</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link py-2" :to="{ name: 'docs.vue.components.datepicker' }">
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
