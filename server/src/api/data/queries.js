
import { klinesModel } from './models'
import EmptyData from './modules/emptyData'


// queries -------------------


export const data = async ({ symbol, interval, from, to }) => {

    return await klinesModel.aggregate([{
        $match: {
            symbol,
            interval,
            "data.ts": {
                $gte: from,
                $lt: to
            }
        }
    }, {
        $project: {
            "data": {
                $filter: {
                    input: "$data",
                    as: "data",
                    cond: {
                        $and: [
                            { $gte: ["$$data.ts", from] },
                            { $lte: ["$$data.ts", to] }
                        ]
                    }
                }
            }
        }
    }]).then(res => {
        return res[0].data
        /*
          if (res[0]) {
              const d = res[0].data
              return new EmptyData(d, from, to)
          } else {
              return new EmptyData([], from, to)
          }
        */
    })
}

export const lastData = ({ symbol, interval }) =>
    klinesModel.findOne({ symbol, interval }, { 'data': { $slice: -1 } }).then(res => (res && res.data.length > 0) ? res.data[0] : false)


// mutations --------------------------


export const saveData = ({ symbol, interval }, data) => {
    return klinesModel.updateOne({ symbol, interval }, { $set: { data, updated: new Date().getTime() } }, (err, doc) => {
        if (err) console.log(err)
    })
}

export const updateData = async ({ symbol, interval }, subdoc = {}) => {
    const updated = new Date().getTime()
    return klinesModel.findOneAndUpdate({ symbol, interval, 'data.ts': subdoc.ts, }, { 'data.$': subdoc, updated })
        .then(res => {
            return (!res) ? klinesModel.updateOne({ symbol, interval }, { $push: { 'data': subdoc }, updated }) : true  // if "null"
        })
}

export const updateManyData = (params, subdocs = []) => {
    return subdocs.forEach(i => updateData(params, i))
}

// test requests
// saveData('test', [{ ts: 1000, val: 0 }, { ts: 1100, val: 100 }, { ts: 1200, val: 200 }, { ts: 1300, val: 300 }])

// updateData('test', { ts: 1600, val: 500 })
// updateManyData('test', [{ ts: 1000, val: 101 }, { ts: 1400, val: 600 }])

// data('test', 1609459200, 1609459201).then(res => console.log(res))