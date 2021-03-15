<template>
    <v-row>
        <v-col cols=12 md=6 sm=12>
            <v-card class="px-5 py-5" elevation=3>
                <div class="grey--text h4">SOV amount</div>
                <div>{{sov}}</div>
            </v-card>
        </v-col>
        <v-col cols=12 md=6 sm=12>
            <v-card class="px-5 py-5" elevation=3>
                <div class="grey--text h4">SVX amount</div>
                <div>{{svx}}</div>
            </v-card>
        </v-col>
    </v-row>
    </v-card>
</template>


<script>
    import { mapState } from 'vuex'

    export default {
        data: () => ({
            sov: 0,
            svx: 0,

            polling: null
        }),
        computed: mapState({
            eos: state => state.blockchain.eos,
            scatter: state => state.blockchain.scatter,
        }),
        watch: {
            scatter(val) {
                if (val) this.getBalance()
            }
        },
        mounted() {
            this.polling = setInterval(() => this.getBalance(), 1000)
        },
        beforeDestroy() {
            if (this.polling) clearInterval(this.polling)
        },
        methods: {
            getBalance() {
                const sovBalancePrimise = this.eos.getTableRows({
                    "json": "true",
                    "code": "sovmintofeos",
                    "scope": this.scatter.name,
                    "table": "accounts"
                }).then(res => parseFloat(res.rows[0].balance))

                const svxBalancePrimise = this.eos.getTableRows({
                    "json": "true",
                    "code": "svxmintofeos",
                    "scope": this.scatter.name,
                    "table": "accounts"
                }).then(res => parseFloat(res.rows[0].balance))

                Promise.all([sovBalancePrimise, svxBalancePrimise]).then(res => {
                    this.sov = res[0] || 0
                    this.svx = res[1] || 0
                })
            },
        }
    }
</script>