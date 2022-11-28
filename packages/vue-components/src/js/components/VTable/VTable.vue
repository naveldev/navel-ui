<template>
    <table class="table table-responsive">
        <thead>
            <tr>
                <slot name="table-head" />
            </tr>
        </thead>
        <tbody>
            <slot name="table-content" />
        </tbody>
    </table>
</template>

<script>
	export default {
		name: 'VTable',

		props: {
			loading: {
                type: Boolean,
                default: false
			},
			data: {
                type: Object,
			}
		}
	}
</script>
