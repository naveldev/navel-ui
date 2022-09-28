<template>
    <div class="offcanvas" :class="{ 'show': isActive }" @click.prevent="triggerClose">
        <transition name="animation-offcanvasAnimation" enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutLeft" mode="out-in" appear>
            <div class="offcanvas-container" v-if="isActive">
                <slot name="offcanvas">
                    <!-- Title -->
                    <slot name="offcanvas-heading">
                        <div class="offcanvas-heading d-flex">
                            <slot name="offcanvas-title" />

                            <div class="ml-auto color-muted p-1">
                                <a @click.prevent="this.setState(false)">
                                    <v-icon icon="fa-xmark-circle" />
                                </a>
                            </div>
                        </div>
                    </slot>

                    <!-- Body -->
                    <div v-if="this.$slots['offcanvas-content']" class="offcanvas-content">
                        <slot name="offcanvas-content" />
                    </div>

                    <!-- Footer -->
                    <div v-if="this.$slots['offcanvas-footer']" class="offcanvas-footer">
                        <slot name="offcanvas-footer" />
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
	export default {
		name: 'VOffcanvas',

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

                let element = this.$el.querySelector('.offcanvas-container')

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
