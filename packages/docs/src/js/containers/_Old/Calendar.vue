<template>
	<div class="container py-5">
		<div class="card">
			<div class="card-content">
				<h2>Date picker</h2>

				<div class="card-footer">
					<v-button class="mr-2" @click="options.loading = !options.loading">Loading {{ options.loading ? 'Off' : 'On' }}</v-button>
					<v-button class="mr-2" @click="options.disabled = !options.disabled">{{ !options.disabled ? 'Enabled' : 'Disabled' }}</v-button>
					<v-button class="mr-2" @click="options.error = !options.error">Error {{ options.error ? 'On' : 'Off' }}</v-button>
					<v-button class="mr-2" @click="options.error = {message: 'nono'}">Set Error with Message</v-button>
				</div>
			</div>

			<!-- Code Block -->
			<v-code-block code='
				<v-date-picker v-model="options.value" :loading="options.loading" :disabled="options.disabled" :required="options.required" :state="options.state" :error="options.error" prefix="$">
					<template v-slot:suffix="{}">
						Suffix
					</template>
				</v-date-picker>'>
			</v-code-block>
		</div>
    </div>
</template>

<script>
	export default {
		name: 'Calendar',

        data() {
            return {
                options: {
                    value: 'test',
                    loading: false,
                    disabled: false,
                    error: false,
                },
            }
        },
	}
</script>
