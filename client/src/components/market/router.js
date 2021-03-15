export default {
	path: '/market/:symbol',
	name: 'market',
	meta: {
		name: 'Market',
	},
	props: route => ({
        interval: route.query.interval || '5m'
    }),
	component: () => import('./index.vue')
}