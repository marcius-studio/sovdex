import axios from 'axios'
import moment from 'moment'
import timestring from 'timestring'

import { lastData, updateData } from '../queries'
import { config, schema } from '../../config'

export default class BuildCandle {
    constructor() {
        // console.log('[build candle] start')
        this.init()
    }

    init() {
        return this.ticks()
            .then(res => {
                if (res && Array.isArray(res)) {
                    this.buildCandles(res)
                } else {
                    console.log('[build candle] error response ticks "then"')
                }
            })
            .catch(() => console.log('[build candle] error response ticks'))
    }

    ticks() {
        const promises = config.markets.map(symbol =>
            new Promise((resolve, reject) => request(schema[symbol]).then(price => resolve({ symbol, price: price || 0 }))))
        return Promise.all(promises)
    }

    async buildCandles(ticks = []) {

        let records = ticks.reduce((p, c) => {
            const arr = config.intervals.map(interval => ({ interval, ...c }))
            return p = p.concat(arr)
        }, [])

        // records= records.filter(i=> i.interval == '5m' && i.symbol == 'soveos')

        for await (const i of records) {
            const candle = await this.buildCandle(i)
            await updateData({ symbol: i.symbol, interval: i.interval }, candle)
        }

    }

    async buildCandle(tick) {
        const lastCandle = await lastData(tick)

        //onsole.log(tick, lastCandle)

        let candle = {
            o: tick.price,
            h: tick.price,
            l: tick.price,
            c: tick.price,
            ts: timestamp(new Date().getTime(), tick.interval)
        }

        if (lastCandle && lastCandle.ts == candle.ts) {
            //console.log('111111111111')
            candle.o = lastCandle.o
            candle.h = (tick.price > lastCandle.h) ? tick.price : lastCandle.h
            candle.l = (tick.price < lastCandle.l) ? tick.price : lastCandle.l
        }

        //console.log(candle)

        return candle

    }
}

// helpers ------------

function request(data) {
    return axios({
        method: 'post',
        url: 'https://eos.greymass.com/v1/chain/get_table_rows',
        data
    })
        .then(res => res.data)
        .then(res => res.rows[0] ? parseFloat(parseFloat(res.rows[0].price).toFixed(8)) : 0)
        .catch(err => console.log(err))
}

function timestamp(timestamp, resolution) {
    const interval = timestring(resolution) * 1000
    const ts = moment(timestamp)

    return moment(Math.floor(ts / interval) * interval).utc().valueOf()
}