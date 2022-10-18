<template>
	<div class="container py-5">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-xs-12 col-md-6">
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
