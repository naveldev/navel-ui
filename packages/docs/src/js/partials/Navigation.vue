<template>
	<nav class="nav-top nav-primary py-2">
		<div class="container d-flex flex-row align-items-center">
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
				<li class="nav-button">
					<v-dropdown :options="{ direction: 'right', closeTrigger: true }">
						<!-- Title -->
						<template v-slot:title>
							<a class="btn btn-outline btn-primary color-primary-100 d-flex" href="#">
								v2.0.1

								<span class="ml-auto pl-3">
									<i class="fa-regular fa-chevron-down"></i>
								</span>
							</a>
						</template>

						<!-- Content -->
						<template v-slot:dropdown-content>
							<li class="nav-item">
								<a class="nav-link color-gray-900" target="_blank" href="https://github.com/naveldev/navel-ui">
									GitHub

									<span class="ml-auto">
										<i class="fa-regular fa-up-right-from-square"></i>
									</span>
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link color-gray-900" target="_blank" href="https://github.com/naveldev/navel-ui/issues/new/choose">
									Report a issue

									<span class="ml-auto">
										<i class="fa-regular fa-up-right-from-square"></i>
									</span>
								</a>
							</li>
						</template>
					</v-dropdown>
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
