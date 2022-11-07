<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <slot name="table-head" />
                </tr>
            </thead>
            <tbody>
                <tr>
                    <slot name="table-content" />
                </tr>
            </tbody>
        </table>
    </div>
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
