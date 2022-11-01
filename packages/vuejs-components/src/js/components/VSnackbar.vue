<template>
    <div class="snackbar mt-2 mx-2" :style="snackbarStyle" :class="snackbarClass">
        <div class="snackbar-content d-flex align-items-center">
            <p v-if="this.message.text" v-html="this.message.text"></p>

            <div class="ml-auto" v-if="this.message.dismissible !== false" @click="dismissClick">
                <button class="btn-transparent">
                    Close
                </button>
            </div>
        </div>
    </div>
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

        computed: {
            snackbarStyle() {
                return {
                    '--message-background': this.message.background
                }
            },
            snackbarClass() {
                return [
                    this.message.type,
                    this.messageClass,
                    this.borderClass,
                    {
                        'has-background': this.message.background,
                        'has-border': this.borderClass,
                        'is-dense': this.dense,
                    }
                ]
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
