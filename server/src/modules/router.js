import Router from '@koa/router'
import timestring from 'timestring'
const router = new Router()



import { data, lastData } from '../api/data/queries'
import { config } from '../api/config'

/**
 * Return klines
 * @request http://localhost:3000/?symbol=soveos&interval=5m&from=ms&to=ms
 * @returns {array} => [{open, high, low, close, time}]
 */

router.get('/', async (ctx, next) => {
	let params = ctx.query || {}
	params.limit = (params.limit && params.limit <= 300) ? params.limit : 300
	params.to = new Date().getTime()
	params.from = params.to - ((timestring(params.interval) * 1000) * 500)

	if (params.symbol && params.interval && params.from && params.to) {
		ctx.body = await data(params)
	} else {
		ctx.body = []
	}
})

router.get('/lastCandle', async (ctx, next) => {
	let params = ctx.query || {}

	if (params.symbol && params.interval) {
		ctx.body = await lastData(params)
	} else {
		ctx.body = {}
	}
})

/**
 * Default config for charts
 * @returns {object} => {markets:Array, intervals:Array}
 */

router.get('/config', async (ctx, next) => {
	ctx.body = config
})

export default router