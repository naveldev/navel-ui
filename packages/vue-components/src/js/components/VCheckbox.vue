<template>
    <div class="">
        <input type="checkbox" v-model="input" @change="this.$emit('update:modelValue', input)" />

        <slot v-if="this.$slots.label || label" name="label">
            <label>{{ label }}</label>
        </slot>
    </div>
</template>

<script>
    export default {
        name: 'VCheckbox',

        data() {
            return {
                input: false
            }
        },

        props: {
            modelValue: {
                default: ''
            },
            label: {
                required: false,
                default: false,
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
            selected: {
                type: Boolean,
                required: false,
                default: false,
            },
        },

        watch: {
            modelValue: {
                handler: function (value) {
                    this.input = value
                },
                immediate: true,
            },
            selected: {
                handler: function (value) {
                    console.log('', value)
                    this.input = value
                },
                immediate: true,
            },
        },
    }
</script>
