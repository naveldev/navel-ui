<template>
    <div class="modal p-5" :class="{ 'show': isActive }" @click.prevent="triggerClose">
        <div class="d-flex justify-content-center">
            <transition name="animation-modalAnimation" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in" appear>
                <div class="modal-container" v-if="isActive">
                    <slot name="modal">
                        <!-- Title -->
                        <slot name="modal-header">
                            <div class="modal-heading d-flex">
                                <slot name="modal-title" />

                                <div class="ml-auto color-muted p-1">
                                    <a @click.prevent="this.setState(false)">
                                        <v-icon icon="fa-xmark-circle" />
                                    </a>
                                </div>
                            </div>
                        </slot>

                        <!-- Body -->
                        <div v-if="this.$slots['modal-content']" class="modal-content">
                            <slot name="modal-content" />
                        </div>

                        <!-- Footer -->
                        <div v-if="this.$slots['modal-footer']" class="modal-footer">
                            <slot name="modal-footer" />
                        </div>
                    </slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'VModal',

        props: {
            state: {
                type: Boolean,
                default: false,
            }
        },

        data() {
            return {
                isActive: this.state,
            }
        },

		methods: {
			triggerClose(e) {
                if (!(this.$el instanceof HTMLElement)) {
                    return false
                }

                let element = this.$el.querySelector('.modal-container')

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

		watch: {
			"state" (state) {
				this.isActive = state
			}
		}
	}
</script>
