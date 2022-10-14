<template>
	<div class="card">
		<div class="card-heading"> 
			<h3>Preview</h3>
		</div>

		<div class="card-content example"> 
			<slot></slot>
		</div>

		<div class="card-heading"> 
			<h3>Code</h3>
		</div>

		<div class="card-content bg-gray">
			<pre><code v-html="parsedTemplate"></code></pre>
		</div>

		<div class="card-content"> 
			<a @click="copyToClipboard" class="btn btn-soft" id="copy">Copy</a>
		</div>
	</div>
</template>

<script>
	import '@naveldev/vuejs-components/src/js/utils/string.js'

	export default {
		name: 'VCodeExample',

		props: {
			template: {
                type: String,
                required: true,
			},
			component: {
                type: Object,
                required: true,
            }
		},

		data() {
			return {
				parsedTemplate: null
			}
		},

		mounted() {
			this.parseComponentTemplate()
		},

		methods: {
			parseComponentTemplate() {
				let content = this.$el.querySelector('.example').innerHTML

				this.parsedTemplate = content.match(/<(\S*?)(.*?)>.*?<\/\1>|<.*?\/>/g).join('\n').htmlEncode()
			}
		},

		computed: {
			/**
			 * Copy the parsed component html to the clipboard
			 */
			copyToClipboard() {
				// get the template html
				let data = this.parsedTemplate.htmlDecode()

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
			}
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
}
</style>
