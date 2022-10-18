<template>
	<div class="container py-5">
		<div class="row">
			<div class="col-xs-12 col-md-6">
				<h1>Getting Started</h1>
				<p class="text-muted py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			
				<h2 class="py-3">Usage</h2>

				<code class="my-3 p-2"><pre>import  { SnackbarService } from '@naveldev/vuejs-components'
					
app.use(SnackbarService)</pre></code>

				<code class="my-3 p-2">
					import { VSnackbarWrapper } from '@naveldev/vuejs-components'
				</code>
			</div>
		</div>
	</div>
</template>

<script>
	import { marked } from 'marked'

	export default {
		layout: 'Documentation',

		computed: {
			parsedMarkdown() {
				//return marked()
			}
		}
	}
</script>
