<template>
    <div v-if="isActive" class="modal">
        <div class="modal-backdrop" @click="this.triggerClose">
        </div>
            <transition class="animation-modalAnimation" name="animation-modalAnimation" enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutLeft" mode="out-in" appear>
                <div class="modal-container d-flex">
                    <slot name="modal">
                        <div class="modal-content" :class="parseDirection">
                            <!-- Title -->
                            <slot name="modal-header">
                                <div class="modal-header d-flex">
                                    <slot name="modal-title" />

                                    <div class="ml-auto color-muted p-1">
                                        <a @click.prevent="this.setState(false)">
                                            <v-icon icon="fa-xmark-circle" />
                                        </a>
                                    </div>
                                </div>
                            </slot>

                            <!-- Body -->
                            <div v-if="this.$slots['modal-content']" class="modal-body">
                                <slot name="modal-content" />
                            </div>

                            <!-- Footer -->
                            <div v-if="this.$slots['modal-footer']" class="modal-footer">
                                <slot name="modal-footer" />
                            </div>
                        </div>
                    </slot>
                </div>
            </transition>
    </div>
</template>

<script>
	export default {
		name: 'VModal',

        props: {
            state: {
                type: Boolean,
                default: false,
            },
            direction: {
                type: String,
                default: 'center',
            }
        },

        data() {
            return {
                defaultDirection: 'center',
                directions: {
                    "right": "ml-auto",
                    "center": "m-auto",
                    "left": "mr-auto",
                },
                isActive: this.state,
            }
        },

		methods: {
			triggerClose(e) {
                if (!(this.$el instanceof HTMLElement)) {
                    return false
                }

                let element = this.$el.querySelector('.modal-content')

                // check if the main element contains the target
				if (element.contains(e.target)) {
                    return false
				}

                this.setState(false)
			},
			setState (state) {
				this.isActive = state

                // update the parent component
                this.$emit('update:state', this.isActive)
			},
		},

        computed: {
            parseDirection() {
                let type

                if (!(type = this.directions[this.direction])) {
                    return this.directions[this.defaultDirection] || false
                }

                return type
            }
        },

		watch: {
			"state" (state) {
				this.isActive = state
			}
		}
	}
</script>
