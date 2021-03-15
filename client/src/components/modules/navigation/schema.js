export default [
	{
		label: 'Stake',
		icon: 'account_balance',
		to: { name: 'stake' },
		auth: true,
	},
	{
		label: 'Exchange',
		icon: 'trending_up',
		to: { name: 'market', params: { symbol: 'soveos' }, query: { interval: '5m' } }
	},
	{
		label: 'Mine',
		icon: 'whatshot',
		to: { name: 'mine' },
		auth: true,
	}
]