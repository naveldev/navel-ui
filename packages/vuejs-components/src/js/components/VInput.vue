<template>
    <div class="form-input d-flex justify-content-start" :class="{ 'form-error': error, 'form-loading': loading, 'color-muted': disabled }">
        <!-- Prefix -->
        <div v-if="this.$slots.prefix || prefix" class="p-3 mr-pull-3">
            <slot name="prefix">
                {{ prefix }}
            </slot>
        </div>

        <!-- Input -->
        <slot name="input">
            <input class="flex-grow-1 p-3" :type="formType" v-model="modelValue" :placeholder="placeholder" :required="required" :disabled="disabled" @input="e => this.$emit('update:modelValue', e.target.value)" :autocomplete="autocomplete" />
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
        <div v-else-if="type === 'password'" class="p-3">
            <span class="tooltip-left" :aria-label="(!show ? 'Show' : 'Hide')" @click.prevent="this.show = !this.show">
                <span v-if="!show">
                    <i class="far fa-eye"></i>
                </span>
                <span v-else>
                    <i class="far fa-eye-slash"></i>
                </span>
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
            autocomplete: {
                type: String,
                required: false,
                default: '',
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
                show: false,
                formTypes: {
                    'text': true,
                    'password': true,
                    'checkbox': true,
                    'radio': true,
                    'email': true
                },
            }
        },

        computed: {
            formType() {
                if (this.type === 'password') {
                    return this.show ? 'text' : 'password'
                }

                return (this.formTypes[this.type] ? this.type : 'text')
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
    }
</script>
