<template>
	<i :class="[parsedType, icon]"></i>
</template>

<script>
	export default {
		name: 'VIcon',

		data() {
			return {
				types: {
					'fas': 'fa-solid',
                    'far': 'fa-regular',
                    'fal': 'fa-light',
                    'fat': 'fa-thin',
                    'fad': 'fa-duotone',
                }
			}
		},

		props: {
			type: {
				type: String,
				default: 'far',
				required: false,
			},
			icon: {
				type: String,
				required: true,
			}
		},

        computed: {
            parsedType() {
                return this.types[this.type] || this.type
            }
        },
	}
</script>
