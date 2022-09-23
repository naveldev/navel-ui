<template>
	<nav class="nav-top py-2">
		<div class="container d-flex flex-row">
			<ul class="nav-list">
				<li class="nav-item">
					<router-link class="nav-link" :to="{ name: 'home' }">
						Home
					</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" :to="{ name: 'docs' }">
						Documentation
					</router-link>
				</li>
			</ul>

			<ul class="nav-list ml-auto">
				<li class="nav-item">
					<a class="nav-link" href="#">
						Version x
					</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'Navigation',
	}
</script>
