<template>
	<svg :class="className" :width="width" :height="height" :fill="fill" xmlns="http://www.w3.org/2000/svg">
		<title v-if="title">{{ title }}</title>
		<use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
	</svg>
</template>

<script>
	export default {
		name: 'svg-icon',
		props: {
			name: {
				type: String,
				required: true
			},
			title: {
				type: String,
				default: null
			},
			height: {
				type: String,
				default: '1.2rem'
			},
			width: {
				type: String,
				default: '1.2rem'
			},
			fill: {
				type: String,
				default: 'white'
			}
		},
		computed: {
			iconPath() {
				let icon = require(`@/assets/icons/${this.name}.svg`)
				if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
					icon = icon.default
				}
				return icon.url
			},
			className() {
				return 'svg-icon svg-icon--' + this.name
			}
		}
	};
</script>

<style lang="scss" scoped>
	.svg-icon {
		fill: #fff;
	}
</style>