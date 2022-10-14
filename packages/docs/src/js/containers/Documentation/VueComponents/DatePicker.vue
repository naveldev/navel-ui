<template>
	<div class="container py-5">
		<!-- Code Block -->
        <v-interactive-code-example v-model="value" :component="component" :template="template" :arguments="arguments" :options="options" />
    </div>
</template>

<script>
	import { template, options } from '@/stories/datepicker.stories.js'

	export default {
		layout: 'Documentation',
		name: 'DatePicker',

		data() {
			return {
				template: template.template,
				value: template.value ?? '',
				component: {
					title: template.title,
					component: template.component
				},
				arguments: options
			}
		},
	}
</script>
