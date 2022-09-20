<template>
	<div class="card-content" ref="codeWrapper">
		<slot name="codeWrapper">
			{{ render }}
		</slot>
	</div>
	<div class="card-footer">
		<a @click="copyToClipboard" class="btn btn-soft">Copy</a>
		<pre><code v-html="parsedContent"></code></pre>
	</div>
</template>

<script>
	export default {
		name: 'VCodeBlock',

		props: {
			code: {
                type: String,
                default: '',
                required: false,
            },
		},

		data() {
			return {
				render: false,
				content: false,
			}
		},

		mounted() {
			if (!this.content) {
				this.content = this.$refs.codeWrapper.innerHTML || this.$slots.codeWrapper.innerHTML
			}
		},

		methods: {
			copyToClipboard(element) {
				// Get the text field
				let copyTextBtn = element.explicitOriginalTarget
				let data = new String(this.parsedContent)
				
				// format the data back to HTML
				data = data.replace(new RegExp('<br />', 'g'), '\n')

				// Copy the text inside the text field
				navigator.clipboard.writeText(data.htmlDecode())

				// let the user know we copied it!
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
			 * Parse the given data
			 *
			 * @param   {string}  	content
			 * @param   {int}  		indent
			 * @param   {boolean}  	parse
			 *
			 * @return  {void}
			 */
			parse(content, indent = 0, encode = true) {
				return content.replace(/(\<.*?\>)|(\w+)/g, function(sentence) {
					let line = ''

					if (sentence.match(/(\<\w+.*?\>)/g)) {
						indent += 1
					}
					
					line += Array(indent * 2).fill('&#160;').join('')
					line += sentence.replace(/./gm, (s) => {
						return (encode == true ? s.htmlEncode() : s.htmlDecode())
					})
					line += '<br />'

					if (sentence.match(/(\<\/.*?\>)/g) && indent > 0) {
						indent -= 1
					}

					return line
				})
			},
		},

		computed: {
			/**
			 * Unminify the innerHTML for the codeWrapper slot
			 *
			 * @return  {string}
			 */
			parsedContent() {
				return this.parse(this.content, -1)
			},
		},

        watch: {
            "code": {
                handler: function (value) {
                    this.content = value
                },
                immediate: true,
            },
        },
	}
</script>

<style scoped>
pre code {
	white-space: normal;
}
</style>
