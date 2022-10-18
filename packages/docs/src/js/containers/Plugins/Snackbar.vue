<template>
	<div class="container py-5">
		<div class="row">
			<div class="col-xs-12 col-md-6">
				<h1>Getting Started</h1>
				<p class="text-muted py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			</div>
		</div>

		<v-code-example template="/snippets/plugins/snackbar/usage.html" :showPreview="false" :showOptions="false"></v-code-example>
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
