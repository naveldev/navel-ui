<template>
	<label for="styled-switch" class="d-block">{{ label }}</label>
	<input class="form-switch" id="styled-switch" type="checkbox" :value="modelValue" @input="e => this.$emit('update:modelValue', e.target.value)" />
</template>

<script>
    export default {
        name: "VSwitch",

        props: {
            modelValue: {
                type: Boolean,
                default: null
            },
            label: {
                default: ''
            },
            error: {
                required: false,
            },
            items: {
                type: Object,
                required: false,
                default: {},
            },
            loading: {
                type: Boolean,
                required: false,
                default: false,
            },
            required: {
                type: Boolean,
                required: false,
                default: false,
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
            prefix: {
                required: false,
                default: false,
            },
            suffix: {
                required: false,
                default: false,
            },
        },

        data() {
            return {
                show: false,
            }
        },

        methods: {
            updateModelValue(value) {
				this.$emit('update:modelValue', value)
            },
        },

        computed: {
            errorMessage() {
                if (typeof this.error === 'string') {
                    return this.error
                }

                if (typeof this.error.message === 'string') {
                    return this.error.message
                }

                return false
            },
        },

        watch: {
            modelValue: {
                handler: function (value) {
                    let newValue = value

                    if (!value && !(newValue = Object.keys(this.items)[0])) {
                        this.$emit('update:modelValue', value)

						return false
                    }

                    this.updateModelValue(newValue)
                },
                immediate: false,
            },
        },
    }
</script>
