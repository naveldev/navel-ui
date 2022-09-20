<template>
    <div class="form-control d-flex justify-content-start" :class="{ 'form-error': error, 'form-loading': loading, 'color-muted': disabled }">
        <!-- Prefix -->
        <div v-if="this.$slots.prefix || prefix" class="p-3 mr-pull-3">
            <slot name="prefix">
                {{ prefix }}
            </slot>
        </div>

        <!-- Input -->
        <slot name="input">
            <input class="p-3" :type="formType" v-model="input" :placeholder="placeholder" :required="required" :disabled="disabled" @input="e => this.$emit('update:modelValue', e.target.value)" />
        </slot>

        <!-- Suffix -->
        <div v-if="this.$slots.suffix || suffix" class="p-3 ml-pull-3">
            <slot name="suffix">
                {{ suffix }}
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

<script>
    export default {
        name: "VInput",

        props: {
            modelValue: {
                default: ''
            },
            type: {
                type: String,
                required: false,
                default: 'text',
            },
            placeholder: {
                type: String,
                required: false,
                default: '',
            },
            value: {
                type: String,
                required: false,
            },
            error: {
                required: false,
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
                input: null
            }
        },

        computed: {
            formType() {
                return 'text';
            },
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
                    if (value) {
                        this.input = value
                    }
                },
                immediate: true,
            },
        },
    }
</script>
