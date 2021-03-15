import axios from 'axios'

const schema = {
    soveos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "pair",
        "json": true
    },
    svxeos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "svxpair",
        "json": true
    },
    sovusdt: {
        "code": "sovdexrelays",
        "scope": "USDT",
        "table": "pair",
        "json": true
    },
    eospbtc: {
        "code": "sovdexrelays",
        "scope": "PBTC",
        "table": "eospair",
        "json": true
    },
    powpbtc: {
        "code": "sovdexrelays",
        "scope": "PBTC",
        "table": "powpair",
        "json": true
    }
}

function request(data) {
    return axios({
        method: 'post',
        url: 'http://eos.greymass.com/v1/chain/get_table_rows',
        data
    })
        .then(res => res.data)
        .catch(err => console.log(err))
}


request(schema.soveos).then(res=> console.log(res))

