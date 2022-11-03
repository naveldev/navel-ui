<template>
	<div v-if="code">
		<div class="card-content" v-html="code" v-if="showPreview"></div>

		<v-code-api v-if="showExample" :code="code" :showOptions="showOptions" />
	</div>
</template>

<script>
	import { VueForm } from '@naveldev/vue-form'
	import VCodeApi from './VCodeApi.vue'

	export default {
		name: 'VCodeExample',

		components: {
			VCodeApi
		},

		props: {
			template: {
                type: String,
                required: true,
			},
			showExample: {
                type: Boolean,
                required: false,
				default: true
			},
			showPreview: {
                type: Boolean,
                required: false,
				default: true
			},
			showOptions: {
                type: Boolean,
                required: false,
				default: true
			}
		},

		data() {
			return {
				code: null
			}
		},

		async created() {
			if (this.template) {
				const { data, status } = await new VueForm().get(this.template)

				this.code = data
			}
		}
	}
</script>
