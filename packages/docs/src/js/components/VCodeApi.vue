<template>
	<div class="position-relative">
		<div v-if="showOptions" class="position-absolute right-10 top-10">
			<div class="ml-auto">
				<a @click="copyToClipboard" class="btn btn-primary btn-soft tooltip-bottom" aria-label="Copy" id="copy"><i class="fa-regular fa-copy"></i></a>
			</div>
		</div>

		<pre><code>{{ code }}</code></pre>

		<slot name="root"></slot>
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

				copyTextBtn.oldAriaLabel = copyTextBtn.ariaLabel
				copyTextBtn.ariaLabel = 'Copied!'

				setTimeout(() => {
					copyTextBtn.ariaLabel = copyTextBtn.oldAriaLabel
				}, 2500)
			}
		}
	}
</script>

<style scoped>
pre {
	background-color: var(--color-gray-100);
	box-shadow: var(--box-shadow);
	border-radius: var(--border-radius);
    overflow: auto;
	padding: 15px;
	min-height: 55px;
	-moz-tab-size: 4;
	tab-size: 4;
}
pre code {
}
</style>
