<template>
    <v-dropdown>
        <!-- Title -->
        <template v-slot:title>
            <div class="d-block form-input d-flex justify-content-start" :class="{ 'form-error': error, 'form-loading': loading, 'color-muted': disabled }">
                <!-- Prefix -->
                <div v-if="this.$slots.prefix || prefix" class="p-3 mr-pull-3">
                    <slot name="prefix">
                        {{ prefix }}
                    </slot>
                </div>

                <!-- Input -->
                <slot name="input">
                    <div class="p-3">
                        {{ modelValue || placeholder }}
                    </div>
                </slot>

                <!-- Suffix -->
                <div class="p-3 ml-pull-3">
                    <slot name="suffix">
                        <v-icon icon="fa-chevron-down" />
                    </slot>
                </div>

                <!-- Icons -->
                <div v-if="loading" class="p-3">
                    <i class="fas fa-spinner-third fa-spin"></i>
                </div>
                <div v-else-if="error" class="color-danger p-3">
                    <span :class="{ 'tooltip-left': errorMessage !== false }" :aria-label="errorMessage">
                        <i class="far fa-exclamation"></i>
                    </span>
                </div>
            </div>
        </template>

        <!-- Content -->
        <template v-slot:dropdown-content>
            <span v-if="items" v-for="(value, key) in items" :key="value">
                <slot name="entry" v-bind:key="key" v-bind:value="value" v-bind:callback="updateModelValue">
                    {{ value }}
                </slot>
            </span>
        </template>
    </v-dropdown>
</template>

<script>
    export default {
        name: "VSelect",

        props: {
            modelValue: {
                default: null
            },
            placeholder: {
                default: 'Select a entry'
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
                        return false
                    }

                    this.updateModelValue(newValue)
                },
                immediate: false,
            },
        },
    }
</script>
