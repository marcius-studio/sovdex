import mongoose from 'mongoose'
import { config } from '../config'

const klineSchema = new mongoose.Schema({
    o: Number,
    h: Number,
    l: Number,
    c: Number,
    v: Number,
    val: Number,
    ts: Number
})

const klinesSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
    },
    interval: {
        type: String,
        required: true,
    },
    data: {
        type: Array,
        default: [klineSchema],
    },
    updated: {
        type: Number,
        default: new Date().getTime()
    }
}, { collection: 'klines' })

export const klinesModel = mongoose.model('klines', klinesSchema)

// init data -----------------------

const initDBdata = config.markets.reduce((p, c) => {
    const arr = config.intervals.map(interval => ({ symbol: c, interval, data: [] }))
    return p = p.concat(arr)
}, [])

klinesModel.countDocuments({}, (err, count) => {
    if (count == 0) return klinesModel.insertMany(initDBdata)
})