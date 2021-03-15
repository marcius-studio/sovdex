<template>
	<v-toolbar>
		<v-tabs show-arrows center-active fixed-tabs>
			<v-tab v-for="(i,idx) in markets" :key="idx"
				:to="{name: 'market', params:{ symbol: i.symbol }, query: {interval: '5m'}}">{{ i.name }}
			</v-tab>
		</v-tabs>
	</v-toolbar>
	<!--

		<div class="columns col-gapless col-oneline" ref="markets">
		<div class="column col-4 col-sm-3" v-for="(i,idx) in markets" :key="idx">
			<router-link class="btn btn-sm btn-block" :to="{name: 'market', params:{ symbol: i.symbol }}"
				v-html="i.name" tag="button" style="height: 30px;"
				:class="[i.symbol == $route.params.symbol ? 'btn-primary' : 'btn-link' ]" />
		</div>
	</div>
-->
</template>

<script>
	export default {
		data: () => ({
			markets: [
				{
					name: 'sov/eos',
					symbol: 'soveos'
				},
				{
					name: 'svx/eos',
					symbol: 'svxeos'
				},
				{
					name: 'sov/usdt',
					symbol: 'sovusdt'
				},
				{
					name: 'eos/pbtc',
					symbol: 'eospbtc'
				},
				{
					name: 'pow/pbtc',
					symbol: 'powpbtc'
				},
			],
		}),
	}
</script>