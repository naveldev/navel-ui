<template>
	<div class="card-content"> 
		<component :is="component.title" v-model="model" v-bind="options" />
	</div>

	<v-code-api v-if="showExample" :code="parsedTemplateToComponent" :showOptions="showOptions">
		<template v-slot:root={}>
			<div class="card-heading"> 
				<h3>Interactions</h3>
			</div>

			<div class="card-content"> 
				<div v-if="arguments" v-for="(argument, key) in arguments">
					<label>{{ argument.label ?? key }}</label>

					<component :is="componentAliases[argument.type] ?? 'input'" v-model="argument.default"></component>
				</div>
			</div>
		</template>
	</v-code-api>
</template>

<script>
	import { VInput, VCheckbox, VDatePicker, VSwitch } from '@naveldev/vuejs-components'
	import VCodeApi from './VCodeApi.vue'

	import '@naveldev/vuejs-components/src/js/utils/string.js'

	export default {
		name: 'VInteractiveCodeExample',

		components: {
			"vinput": VInput,
			"vcheckbox": VCheckbox,
			"vswitch": VSwitch,
			"vdate": VDatePicker,
			VCodeApi,
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
			},
			component: {
                type: Object,
                required: true,
            },
			arguments: {
                type: Object,
                required: false,
			},
			modelValue: {
                type: String,
                required: false,
			},
			value: {
                type: String,
                required: false,
			}
		},

		data() {
			return {
				componentAliases: {
					"String": "vinput",
					"Boolean": "vswitch",
					"Date": "vdate",
				},
				model: null
			}
		},

		created() {
			this.model = this.modelValue
		},

		computed: {
			/**
			 * Return the bind array for the live component
			 *
			 * @return  {object}
			 */
			options() {
				let object = {}

				Object.keys(this.arguments).forEach((key, index) => object[key] = this.arguments[key].default ?? this.arguments[key])

				return object || {}
			},
			/**
			 * Parse a default template with the options
			 *
			 * @return  {String}
			 */
			parsedTemplateToComponent() {
				let template = new String(this.template)

				// parse the binds
				let binds = new String()

				Object.keys(this.arguments).forEach((key, index) => {
					let value = this.arguments[key]

					// check if we have a value
					if (!value.default) {
						return false;
					}

					if (value.type === 'String') {
						binds += `${key}="${value.default}" `
					} else {
						binds += `v-bind:${key}="${value.default}" `
					}
				})

				let regex

				// replace the placeholder with the binds
				regex = new RegExp('v-bind="(\\w+)"', 'g')

				template = template.replace(regex, binds)

				return template
			},
		},

        watch: {
            model: {
                handler: function (value) {
					if (value) {
						this.model = value
						this.$emit('update:modelValue', value)
					}
                },
                immediate: true,
            },
        },
	}
</script>

<style scoped>
pre {
	border: 1px solid rgb(var(--color-muted));
	border-radius: 5px;
	padding: 7px;
}
pre code {
	white-space: normal;
}
</style>
