import moment from 'moment'

export default class EmptyData {
    constructor(data = [], from, to) {
        const ranges = this.ranges(from, to)
        const merged = this.merge(ranges, data)

        return merged
    }

    merge(arr1 = [], arr2 = []) {
        let merged = []

        for (let i = 0; i < arr1.length; i++) {
            merged.push({
                ...arr1[i],
                ...(arr2.find((itmInner) => itmInner.ts === arr1[i].ts))
            }
            )
        }

        return merged
    }

    /**
     * Create 5m intervals based 5m data
     * @param {*} from
     * @param {*} to 
     */

    ranges(from, to) {

        from = this.timestamp(from)
        to = this.timestamp(to) + (1000 * 60 * 5)

        const interval = 1000 * 60 * 5 // 5min
        let time = from
        let arr = []

        while (time <= to) {
            const s = { openTime: time, closeTime: time + interval, ts: time, val: 1 }
            time = s.closeTime
            arr.push(s)
        }

        return arr
    }

    // utilites --------------

    timestamp(timestamp) {
        const interval = 1000 * 60 * 5  // 5 min
        const ts = moment(timestamp)

        return moment(Math.floor(ts / interval) * interval).utc().valueOf()
    }
}