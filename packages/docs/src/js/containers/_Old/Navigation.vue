<template>
	<div class="container py-5">

		<!-- Code Block -->
        <v-code-block>
			<nav class="nav-top py-2">
				<div class="container d-flex flex-row">
					<ul class="nav-list">
						<li class="nav-item">
							<a class="nav-link" href="/">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Example
							</a>
						</li>
					</ul>

					<ul class="nav-list ml-auto">
						<li class="nav-item">
							<a class="nav-link" href="#">
								Sign Up
							</a>
						</li>
						<li class="nav-button">
							<button class="btn btn-primary">Login</button>
						</li>
					</ul>
				</div>
			</nav>
		</v-code-block>
    </div>
</template>

<script>
	export default {
		name: 'Navigation',
	}
</script>
