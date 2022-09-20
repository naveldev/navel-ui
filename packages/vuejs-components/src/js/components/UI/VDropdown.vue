<template>
	<div class="dropdown" :class="direction">
		<span @click="this.toggle()">
			<slot name="title"/>
		</span>

		<div class="dropdown-content" :class="{ 'd-block': state }">
            <slot name="dropdown-content" />
        </div>
	</div>
</template>

<script>
	export default {
		name: 'VDropdown',

        props: {
            options: {
                type: Object,
                default: {
                    active: false,
                    closeTrigger: true,
                    direction: null
                }
            }
        },

		data() {
			return {
				element: null,
				state: false,
				event: null,
                directions: {
                    "left": "dropdown-left",
                    "center": "dropdown-center",
                    "right": "dropdown-right",
                }
			}
		},

		mounted () {
            if (this.options.closeTrigger == true) {
			    document.addEventListener('click', this.triggerClose)
            }
		},

		beforeDestroy () {
            document.removeEventListener('click',this.triggerClose)
		},

		methods: {
			toggle() {
				if (this.state == false)
					this.open()
				else
					this.close()
			},
			triggerClose(e) {
				if (this.$el.contains(e.target)) {
                    return false
				}

                this.state = false
			},
			open () {
				this.state = true
			},
			close (e) {
				this.state = false
			}
		},

        computed: {
            direction() {
                return this.directions[this.options.direction] || false
            }
        },

        watch: {
            options: function(value) {
                if (value.active) {
                    this.state = value.active
                }

                if (value.closeTrigger == true) {
                    document.addEventListener('click', this.triggerClose)
                }

                if (value.closeTrigger == false) {
                    document.removeEventListener('click',this.triggerClose)
                }
            }
        }
	}
</script>
