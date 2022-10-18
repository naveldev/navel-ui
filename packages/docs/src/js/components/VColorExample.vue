<template>
	<div class="color-display" :style="styles">
		<span>{{ rgb.red }}, {{ rgb.green }}, {{ rgb.blue }} ({{ hex }})</span>
	</div>
</template>

<script>
	export default {
		name: "VColorExample",

		props: {
			color: {
				type: [Array, String],
				required: true,
			}
		},

		data() {
			return {
				rgb: [0, 0, 0],
				hex: null
			}
		},

		created() {
			// if the given color is a HEX string
			if (this.isHex(this.color)) {
				this.hex = this.color
				this.rgb = this.hexToRgb(this.hex)
			}

			// if the given color is a RGB string
			if (this.isRgb(this.color)) {
				this.rgb = this.parseRgbToArray(this.color)
				this.hex = this.rgbToHex(this.rgb)
			}
		},

		methods: {
			parseRgbToArray(color) {
				let matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
				let result = matchColors.exec(color)

				return {
					red: parseInt(result[1]),
					green: parseInt(result[2]),
					blue: parseInt(result[3])
				}
			},
			/**
			 * Check wether the given color is a HEX
			 *
			 * @param   {string}  color
			 *
			 * @return  {boolean}
			 */
			isHex(color) {
				var regex = /^#([0-9a-f]{3}){1,2}$/i

				return regex.test(color)
			},
			/**
			 * Check wether the given color is a RGB
			 *
			 * @param   {string}  color
			 *
			 * @return  {boolean}
			 */
			isRgb(color) {
				let matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/

				return matchColors.test(color)
			},
			/**
			 * Transform a single R, G or B color to its hex variant
			 *
			 * @param   {string}  color
			 *
			 * @return  {string}
			 */
			componentToHex(c) {
				var hex = c.toString(16)

				return hex.length == 1 ? "0" + hex : hex
			},
			/**
			 * Transform a RGB to a HEX color
			 *
			 * @param   {string}  color
			 *
			 * @return  {string}
			 */
			rgbToHex(color) {
				return "#" + this.componentToHex(color.red) + this.componentToHex(color.green) + this.componentToHex(color.blue)
			},
			/**
			 * Transform a HEX to a RGB color
			 *
			 * @param   {string}  color
			 *
			 * @return  {array}
			 */
			hexToRgb(color) {
				var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)

				return result ? {
					red: parseInt(result[1], 16),
					green: parseInt(result[2], 16),
					blue: parseInt(result[3], 16)
				} : null
			},
		},

		computed: {
			styles() {
				return {
					"--color": this.hex
				};
			}
		}
	}
</script>

<style scoped>
div.color-display {
	position: relative;
	display: flex;
	align-items: center;
}
div.color-display:before {
	position: relative;
	height: 1em;
	margin-right: 1rem;
	width: 1em;
	content: "";
	background: var(--color);
	border-radius: .5em;
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .1);
}
</style>