<template>
	<div class="card">
		<div class="card-heading"> 
			<h3>Live Preview</h3>
		</div>
		<div class="card-content"> 
			<component :is="component.title" v-model="model" v-bind="options" />
		</div>

		<div class="card-heading"> 
			<h3>Interactions</h3>
		</div>
		
		<div class="card-content"> 
			<div v-if="arguments" v-for="(argument, key) in arguments">
				<label>{{ argument.label ?? key }}</label>

				<component :is="componentAliases[argument.type] ?? 'input'" v-model="argument.default"></component>
			</div>
		</div>

		<div class="card-heading"> 
			<h3>Code</h3>
		</div>

		<div class="card-content bg-gray">
			<pre><code v-html="parsedTemplateToComponent"></code></pre>
		</div>

		<div class="card-content"> 
			<a @click="copyToClipboard" class="btn btn-soft" id="copy">Copy</a>
		</div>
	</div>
</template>

<script>
	import { VInput, VCheckbox, VDatePicker } from '@naveldev/vuejs-components'
	import VSwitch from './Form/VSwitch.vue'

	import '@naveldev/vuejs-components/src/js/utils/string.js'

	export default {
		name: 'VCodeBlock',

		components: {
			"input": VInput,
			"checkbox": VCheckbox,
			"switch": VSwitch,
			"date": VDatePicker,
		},

		props: {
			template: {
                type: String,
                required: true,
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
					"v-html": "input",
					"String": "input",
					"Boolean": "switch",
					"Date": "date",
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

				return object
			},
			/**
			 * Copy the parsed component html to the clipboard
			 */
			copyToClipboard() {
				// get the template html
				let data = this.parsedTemplateToComponent.htmlDecode()

				// copy the text
				navigator.clipboard.writeText(data.htmlDecode())

				// let the user know we copied it
				let copyTextBtn = this.$el.querySelector('#copy')

				if (!copyTextBtn) {
					return false
				}

				copyTextBtn.oldHTML = copyTextBtn.innerHTML
				copyTextBtn.innerHTML = 'Copied!'
				
				setTimeout(() => {
					copyTextBtn.innerHTML = copyTextBtn.oldHTML
				}, 2500)
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

				return template.htmlEncode()
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
