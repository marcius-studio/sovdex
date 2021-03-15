<template>
	<div class="content">
		<div class="content-header">
			<markets />
		</div>
		<div class="content-body">
			<v-container class="fill-height px-0 py-0" fluid>
				<v-row no-gutters class="fill-height">
					<v-col class="market-layout--chart" cols=12 lg=10 md=8 sm=12>
						<chart :symbol="symbol" v-if="renderComponent" />
					</v-col>
					<v-col class="d-flex justify-center align-center market-layout--createOrder px-5 py-5" cols=12 lg=2
						md=4 sm=12>
						<createOrder style="width: 100%" :symbol="symbol" v-if="$store.getters.isAuth" />
						<div class="grey--text" v-else>Sign in</div>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</div>
</template>

<script>
	import chart from './chart'
	import createOrder from './modules/createOrder'

	import markets from './modules/markets'

	export default {
		data: () => ({
			renderComponent: true
		}),
		computed: {
			symbol() {
				return this.$route.params.symbol || 'soveos'
			},
		},
		watch: {
			symbol(val) {
				this.forceDestroy()
			}
		},
		methods: {

			forceDestroy() {
				this.renderComponent = false
				this.$nextTick(() => this.renderComponent = true)
			}
		},
		components: {
			markets,

			chart,
			createOrder
		}
	}
</script>

<style lang=scss scoped>
	@media screen and (max-width: 600px) {
		.market-layout--chart {
			height: 50vh;
		}

		.market-layout--createOrder {
			height: 50vh;
		}
	}
</style>