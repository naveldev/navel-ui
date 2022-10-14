<template>

	<article
		class="snackbar mt-2"
		:class="[
			this.message.type,
			this.messageClass,
			this.borderClass,
			{
				'has-background': this.message.background,
				'has-border': this.borderClass,
				'is-dense': this.dense,
			},
		]"
		:style="{
			'--message-background': this.message.background,
		}"
	>
		<div class="">
			<div class="snackbar-content">
				<p v-if="this.message.text" v-html="this.message.text"></p>
			</div>

			<div class="spacer"></div>

			<div class="vue3-snackbar-message-close">
				<button v-if="this.message.dismissible !== false" @click="dismissClick">
                    X
				</button>
			</div>
		</div>
	</article>
</template>


<script>
    let timeout = null

    export default {
        name: 'VSnackbar',

        props: {
            borderClass: {
                type: String,
                default: "",
            },
            message: {
                type: Object,
                default: () => ({}),
            },
            messageClass: {
                type: String,
                default: "",
            },
            dense: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                active: false,
                text: '',
                button: '',
                theme: 'default',
                action: null
            }
        },

        mounted() {
            this.setMessageTimeout()
        },

        methods: {
            setMessageTimeout() {
                const messageDuration = !this.message.duration && !this.message.dismissible ? 4000 : this.message.duration

                timeout = setTimeout(this.dismiss, messageDuration)
            },
            dismissClick() {
                if (timeout) clearTimeout(timeout)

                this.dismiss()
            },
            dismiss() {
                this.$emit("dismiss", this.message)
            }
        },

        defineEmits() {
            return [
                "dismiss",
            ]
        },

		watch: {
			"message.count" (v) {
                if (v === 1) return false

                clearTimeout(timeout)

                setMessageTimeout()
			}
		}
    }
</script>
