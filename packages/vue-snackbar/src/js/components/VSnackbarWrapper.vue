<template>
	<teleport :to="this.attach">
		<section
			:class="[generatedBaseClasses]"
			class="position-fixed bottom-2 end-2"
			:style="generatedBaseStyles"
		>
			<transition-group v-if="messages" name="snackbar" tag="div">
				<v-snackbar
                    v-for="message in messages"
					:key="message.id"
					:message="message"
					:message-class="this.messageClass"
					:dense="this.dense"
					:border-class="borderClass"
					@dismiss="remove($event, true)"
				/>
			</transition-group>
		</section>
	</teleport>
</template>

<script>
    import { messages } from '../index.js'
    import EventBus from '../eventbus.js'
    import VSnackbar from './VSnackbar.vue'

    const hashCode = (s) => Math.abs(s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));

    let messageId = 1;

    export default {
        name: 'VSnackbarWrapper',

        components: {
            VSnackbar
        },

        props: {
            // Position
            top: {
                type: Boolean,
                default: false,
            },
            bottom: {
                type: Boolean,
                default: false,
            },
            left: {
                type: Boolean,
                default: false,
            },
            right: {
                type: Boolean,
                default: false,
            },
            // Types
            success: {
                type: String,
                default: "#4caf50",
            },
            error: {
                type: String,
                default: "#ff5252",
            },
            warning: {
                type: String,
                default: "#fb8c00",
            },
            info: {
                type: String,
                default: "#2196f3",
            },
            // Options
            attach: {
                type: [String, HTMLElement],
                default: "body",
            },
            border: {
                type: String,
                default: "",
                validator: (v) => ["top", "bottom", "left", "right", ""].includes(v),
            },
            duration: {
                type: Number,
                default: null,
            },
            messageClass: {
                type: String,
            },
            zIndex: {
                type: Number,
                default: 10000,
            },
            dense: {
                type: Boolean,
                default: false,
            },
            reverse: {
                type: Boolean,
                default: false,
            },
            groups: {
                type: Boolean,
                default: false,
            },
            shadow: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                messages,
                active: false,
                text: '',
                button: '',
                theme: 'default',
                action: null
            }
        },

        mounted() {
            EventBus.$on("add", (ev) => {
                this.$emit("added", ev)

                if (!ev.group) ev.group = hashCode(`${ev.type}${ev.title}${ev.text}`).toString(16)

                // If there's a default duration and no message duration is set, use the default
                if (this.duration && !ev.duration && ev.duration !== 0) ev.duration = this.duration

                // Find the existing message if one with the same group-key already exists
                const existingGroup = ev.group && messages.value.find((msg) => msg.group === ev.group)

                if (this.groups === false || !existingGroup) {
                    const message = {
                        ...ev,
                        id: messageId,
                        count: 1,
                    }

                    if (this.reverse) {
                        messages.value.unshift(message)
                    } else {
                        messages.value.push(message)
                    }
                    messageId++
                } else {
                    existingGroup.count++
                }
            })

            EventBus.$on("clear", () => {
                this.$emit("cleared")
                messages.value = []
            })
        },

        unmounted() {
            EventBus.$off("add")
            EventBus.$off("clear")
        },

        methods: {
            remove(ev, wasDismissed = false) {
                if (wasDismissed) {
                    this.$emit("dismissed", ev)
                } else {
                    this.$emit("removed", ev)
                }

                messages.value = messages.value.filter((message) => {
                    return message.id !== ev.id
                })
            },
        },

        computed: {
            generatedBaseStyles() {
                return {
                    "is-top": this.top,
                    "is-bottom": this.top === false && this.bottom,
                    "is-left": this.left,
                    "is-right": this.left === false && this.right,
                    "is-middle": this.top === false && this.bottom === false,
                    "is-centre": this.left === false && this.right === false,
                    "has-shadow": this.shadow,
                }
            },
            generatedBaseClasses() {
                return {
                    "is-top": this.top,
                    "is-bottom": this.top === false && this.bottom,
                    "is-left": this.left,
                    "is-right": this.left === false && this.right,
                    "is-middle": this.top === false && this.bottom === false,
                    "is-centre": this.left === false && this.right === false,
                    "has-shadow": this.shadow,
                }
            },
            generatedBaseStyles() {
                return {
                    "--success-colour": this.success,
                    "--error-colour": this.error,
                    "--warning-colour": this.warning,
                    "--info-colour": this.info,
                    "--snackbar-zindex": this.zIndex,
                }
            },
            borderClass() {
                return (this.border ? `border-${this.border}` : "")
            }
        },

        defineEmits() {
            return [
                "added",
                "dismissed",
                "removed",
                "cleared"
            ]
        },
    }
</script>
