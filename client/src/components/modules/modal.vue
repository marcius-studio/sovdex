<template>
	<v-row justify="center">
		<v-dialog v-model="show" scrollable max-width="500px">
			<v-card>
				<v-card-title>
					<div v-if="header">
						<slot name="header"></slot>
					</div>
					<div v-else>{{ title }}</div>
					<v-spacer></v-spacer>
					<v-btn @click="toggle" v-if="!header" icon>
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text :class="[c ? c : 'py-5']" style="height: 300px;">
					<slot name="body"></slot>
					<slot></slot>
				</v-card-text>
				<v-divider v-if="footer"></v-divider>
				<v-card-actions v-if="footer">
					<v-spacer></v-spacer>
					<slot name="footer"></slot>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>


<script>
	export default {
		props: ['title', 'event', 'c'],
		data: () => ({
			show: false
		}),
		mounted() {
			// this.$bus.$emit('<event-name>') -> this.$bus.$on('<event-name>')
			if (this.event) this.$bus.$on(this.event, this.toggle)
		},
		computed: {
			header() {
				return !!this.$slots.header
			},
			footer() {
				return !!this.$slots.footer
			},
		},
		methods: {
			toggle() {
				this.show = !this.show
				this.$emit('open', this.show)
			},
		},
	}
</script>