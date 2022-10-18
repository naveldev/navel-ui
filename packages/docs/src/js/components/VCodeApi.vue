<template>
	<div>
		<div v-if="showOptions" class="d-flex align-items-center px-4 py-3 bg-gray-300"> 
			Example

			<div class="ml-auto">
				<a @click="copyToClipboard" class="btn btn-soft btn-xs" id="copy">Copy</a>
			</div>
		</div>

		<div class="bg-gray-200">
			<pre><code>{{ code }}</code></pre>
		</div>

		<slot name="options"></slot>
	</div>
</template>

<script>
	export default {
		name: 'VCodeApi',

		props: {
			showOptions: {
                type: Boolean,
                required: false,
				default: true,
			},
			code: {
                type: String,
                required: true,
			}
		},

		methods: {
			/**
			 * Copy the parsed component html to the clipboard
			 */
			copyToClipboard() {
				// get the template html
				let data = this.code

				// copy the text
				navigator.clipboard.writeText(data)

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
		}
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
