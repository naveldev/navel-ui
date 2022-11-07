<template>
	<div class="container py-5">
		<div class="row">
			<div class="md:col-3"></div>
			<div class="col-12 md:col-6">
                Not Found!
                {{ $route.params.slug }}
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		layout: 'Stylesheet',
	}
</script>
